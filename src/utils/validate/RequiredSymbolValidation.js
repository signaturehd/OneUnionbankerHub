export default class RequiredSymbolValidation {
  isValid (s) {
    const regex = /[\$*@!#%&()^~{}\[\]\;\'\,\.\/\<\>\?\`\-\+\_\=\\\:\"\|]+/
    return regex.test(String(s))
  }
}
