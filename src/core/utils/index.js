const shuffleArrayOfObjects = (arr = []) => {
  const stringifyList = arr.map((el) => JSON.stringify(el));
  const shuffledArr = shuffleArray(stringifyList);

  return shuffledArr.map((el) => JSON.parse(el));
};

const shuffleArray = (arr = []) => {
  const arrToShuffle = Array.from(arr);

  for (let i = arrToShuffle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    if (j !== i) {
      [arrToShuffle[i], arrToShuffle[j]] = [arrToShuffle[j], arrToShuffle[i]];
    }
  }

  return arrToShuffle;
};

const delay = async (delayTime = 0) => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve();
      clearTimeout(timeout);
    }, delayTime);
  });
};

export { shuffleArrayOfObjects, shuffleArray, delay };
