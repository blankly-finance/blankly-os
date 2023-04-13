// minify.js
const Terser = require('terser')
const fs = require('fs')
const path = require('path')
const pkg = require('pkg')

function getAllFiles (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(process.cwd(), dirPath, '/', file))
    }
  })

  return arrayOfFiles.filter(path => path.match(/\.js$/))
}

async function minifyFiles (filePaths) {
  let code = ''

  for (const filePath of filePaths) {
    code = fs.readFileSync(filePath).toString()

    Terser.minify(code, { mangle: true, compress: true }).then(function (result) {
      fs.writeFileSync(
        filePath,
        result.code
      )
    })
  }
}

// Provided by https://stackoverflow.com/a/26038979/8087739
function copyFileSync (source, target) {
  let targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync (source, target) {
  let files = []

  // Check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

copyFolderRecursiveSync('./blankly', './minified')
const files = getAllFiles('./minified')
minifyFiles(files)
pkg.exec(['./blankly/main.js', '--out-path', './dist'])
