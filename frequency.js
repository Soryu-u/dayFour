
function wordFrequency(string) {
    sentence = string.split(' ')
    return frequency = sentence.reduce(function (allWords, word) {
        if (word in allWords) {
            allWords[word]++
        } else {
            allWords[word] = 1
        }
        return allWords
    }, {})    
} 




console.log(wordFrequency("little red fox likes red box red box is big"))