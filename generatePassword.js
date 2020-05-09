function generatePassword(reqBody) {
  // define possible characters
  const charList = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // 無法取到上面lowercase的值
    numbers: '0123456789',
    symbols: '`~!@$%^&*()-_+={}[]|;:"<>,.?/'
  }

  // make a collection of wanted sets
  let collection = []
  for (let option in charList) {
    if (reqBody[option] === 'on') {
      collection = collection.concat(charList[option].split(''))
    }
  }

  // remove specific unwanted characters
  collection = collection.filter(
    char => !reqBody.excludeCharacters.includes(char)
  )

  // return error alert if collection is empty
  if (collection.length === 0) {
    return 'There is no valid characters in your selection.'
  }

  // generate random password and return
  let password = []
  for (let i = 0; i < reqBody.length; i++) {
    const idx = Math.floor(Math.random() * collection.length)
    password += collection[idx]
  }

  return password
}

// export the function for other files to include
module.exports = generatePassword