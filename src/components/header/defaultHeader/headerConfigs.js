export const defaultHeaderMap = {
  '/profile': {
    leftText: false,
    rightButton: {
      type: 'icon',
      text: '더보기',
      actionKey: 'openProfileMenu',
    },
  },
  '/profile/edit': {
    leftText: false,
    rightButton: {
      type: 'text',
      text: '수정',
      action: () => console.log('수정'),
    },
  },
  '/post': {
    leftText: false,
    rightButton: {
      type: 'icon',
      text: '더보기',
      action: () => console.log('더보기'),
    },
  },
  '/followers': {
    leftText: 'Followers',
    rightButton: false,
  },
  '/followings': {
    leftText: 'Followings',
    rightButton: false,
  },
  '/myProfile': {
    leftText: false,
    rightButton: {
      type: 'text',
      text: '저장',
      actionKey: 'saveProfile',
    },
  },
  '/product': {
    leftText: false,
    rightButton: {
      type: 'text',
      text: '저장',
      actionKey: 'saveProfile',
    },
  },
};
