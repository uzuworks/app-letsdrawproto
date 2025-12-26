interface Theme {
  text: string;
}

const theme1 = [{
  text: 'わたしは、おおきなきのうえにいます。',
}, {
  text: 'わたしは、きいろとぴんくのおはなばたけにいます。',
}, {
  text: 'わたしは、ちいさなかわのちかくにいます。',
}] as Theme[];
const theme2 = [{
  text: 'わたしは、げたをはいた「ひとつめこぞう」です。', //下駄音
  after: '/assets/audio/geta.wav'
}, {
  text: 'わたしは、ぼうしをかぶっているねこです。', //にゃー
}, {
  text: 'わたしは、サングラスをかけたかまきりです。', //がしゃがしゃ
}] as Theme[];
const theme3 = [{
  text: 'わたしは、まいごでないています。',
}, {
  text: 'わたしは、たのしくおどっています。',
}, {
  text: 'わたしは、すやすやねむっています。',
}] as Theme[];

export const selectThemes = () => {
  const rnd1 = Math.floor(Math.random() * theme1.length);
  const rnd2 = Math.floor(Math.random() * theme2.length);
  const rnd3 = Math.floor(Math.random() * theme3.length);

  return [
    theme1[rnd1],
    theme2[rnd2],
    theme3[rnd3]
  ]
}
