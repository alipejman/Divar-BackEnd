const isTrue = (value) => ["true", 1, true].includes(value)
const isFalse = (value) => ["flase", 0, false].includes(value);

module.exports = {
    isTrue,
    isFalse
}