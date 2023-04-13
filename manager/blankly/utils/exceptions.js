// Custom exceptions used to better evaluate errors thrown throughout the program
// Copyright (C) Emerson Dove - All Rights Reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// Written by Emerson Dove, 2021

function FileNotFoundError (message) {
  const error = new Error(message)

  error.message = message
  error.code = 'FILE_NOT_FOUND_ERROR'
  return error
}

module.exports.FileNotFoundError = FileNotFoundError
