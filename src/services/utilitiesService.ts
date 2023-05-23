const first = ['Divoký', 'Rychlý', 'Chytrý', 'Debilní']
const second = ['Kokot', 'Dement', 'Miloš', 'Šulin']

export const generateRandomName = () => {
  const randomFirstWord = first[Math.floor(Math.random() * first.length)];
  const randomSecondWord = second[Math.floor(Math.random() * second.length)];

  const randomName = `${randomFirstWord}${randomSecondWord}`;

  const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;

  const randomNameWithNumber = `${randomName}${randomThreeDigitNumber}`;

  return randomNameWithNumber
}

export const generateID = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}