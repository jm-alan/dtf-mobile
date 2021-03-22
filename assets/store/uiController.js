const SIDEBAR = 'interface/SIDEBAR';

const HIDEBAR = 'interface/HIDEBAR';

export const ShowSidebar = () => ({ type: SIDEBAR });

export const HideSidebar = () => ({ type: HIDEBAR });

export default function reducer (state = { sidebar: false }, { type }) {
  switch (type) {
    case SIDEBAR:
      return { ...state, sidebar: true };
    case HIDEBAR:
      return { ...state, sidebar: false };
    default:
      return state;
  }
}
