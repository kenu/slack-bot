const axios = require('axios');
const NumberUtils = require('../common/NumberUtils');
const ArrayUtils = require('../common/ArrayUtils');

const actions = {
  'translate': function (key) {
    const map = {
      '로또': 'lotto',
      '시크릿': 'secret',
      '메뉴': 'menu',
    };
    return (map[key]) ? map[key] : key;
  },
  'lotto': () => {
    if (Math.random() > .2) {
      const list = NumberUtils.getRandomList(45, 6);
      return list.join(', ');
    } else {
      const shuffled = ArrayUtils.shuffle(words);
      return shuffled.pop();
    }
  },
  'secret': () => {
    const shuffled = ArrayUtils.shuffle(words);
    return shuffled.pop();
  },
  'menu': () => {
    const menuList = ['특식', '찌개', '덥밥/볶음밥', '해장', '일식', '중국식', '분식', '국/탕'];
    const menu = ArrayUtils.shuffle(menuList);
    return menu.pop();
  },
  sendToSlack: async function (data) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return await axios.post(process.env.SLACK_INCOMING_WEBHOOK, data, config);
  }
};

var words = ['나까지 나설 필요는 없다',
  '헌신하면 헌신짝 된다',
  '참고 참고 또 참으면 참나무가 된다',
  '포기하면 편하다',
  '왕관을 쓰려는 자, 그 무게를 견뎌라',
  '아니면 말고',
  '나도 나지만 너도 너다',
  '목숨을 버리면 무기만은 살려 주겠다',
  '가는 말이 고우면 사람을 얕본다',
  '잘생긴 놈은 얼굴값하고 못생긴 놈은 꼴값한다',
  '공부는 실수를 낳지만 찍기는 기적을 낳는다',
  '까도 내가 깐다',
  '난 오아시스를 원했고 넌 신기루만으로 좋았던 거지',
  '동정할 거면 돈으로 줘요',
  '“내 너 그럴줄 알았다”? 그럴 줄 알았으면 미리 말을 해주세요',
  '즐길 수 없으면 피하라',
  '이것 또한 지나가리라',
  '대문으로 가난이 찾아오면 사랑은 창문으로 도망간다',
  '일찍 일어나는 새가 더 피곤하다',
  '일찍 일어난 벌레는 잡아 먹힌다',
  '먼저 가는 건 순서가 없다',
  '똥차 가고 벤츠 온다',
  '효도는 셀프',
  '먹는 것이 공부라면 세상에서 공부가 가장 쉬웠어요',
  '어려운 길은 길이 아니다',
  '개천에서 용 난 놈 만나면, 개천으로 끌려 들어간다',
  '이런 인생으론 자서전도 쓸 수 없다',
  '새벽에 맥주와 먹는 치킨은 0칼로리다',
  '늦었다고 생각할 때가 가장 늦은 거다',
  '성형수술하고 나아진 게 아니라 하기 전이 최악이었다',
  '내일 할 수 있는 일을 굳이 오늘 할 필요는 없다',
  '되면 한다',
  '성공은 1%의 재능과 99%의 돈과 빽만 있음 된다',
  '지금 쟤 걱정할 때가 아니다 니가 더 걱정이다',
  '예술은 비싸고 인생은 더럽다',
  '고생 끝에 골병난다',
  '하나를 보고 열을 알면 무당 눈깔이다',
  '원수는 회사에서 만난다',
  '돌다리도 두들겨 보면 내 손만 아프다',
  '재주가 많으면 먹고 살만한 길이 많다',
  '티끌은 모아 봐야 티끌이다',
  '늦잠자는 놈들이 가는 지옥이 있는데 그곳은 바로 다음날 아침이다',
  '기억하자 노력은 종종 배신하지만 포기는 배신하지 않는다',
  '관심이 필요할 땐 좀비가 나오는 게임을 해보자 거기선 세상 모두가 당신을 원한다',
  '어차피 코딩할꺼 행복하게 코딩하자',
  '기분이 태도가 되지 말자',
  '진짜 비밀은 차라리 개에게 털어 놓아라',
  '지금 한다',
  '고통은 지나가지만 아름다움은 남는다',
  '자신감이 약해지면, 남의 충고가 더 크게 들린다',
  '몰래 도망쳐 나왔어. 만사가 싫어졌거든',
  '인생? 나에게 인생에 대해 말하지 마십시오.',
  '내가 매우 우울하다는 것을 알아야 한다고 생각한다.',
];

module.exports = actions;
