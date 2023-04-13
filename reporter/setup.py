from setuptools import find_packages, setup

"""
Build Info:
python3 -m build
twine upload dist/*
"""

setup(
    name='blankly_reporter',  # How you named your package folder (MyLib)
    packages=find_packages(),
    # packages=['blankly'],  # Potentially should be the same thing as name
    version='v0.0.0-beta',
    author_email='contact@blankly.finance',
    url='https://github.com/Blankly-Finance/Blankly',  # Could be github or website
    install_requires=[
        'pyzmq',
        'firebase',
        'google-cloud-storage',
        'firebase_admin'
    ],
)
