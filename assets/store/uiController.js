const SIDEBAR = 'interface/SIDEBAR';

const HIDEBAR = 'interface/HIDEBAR';

const TOGGLEBAR = 'interface/TOGGLEBAR';

export const ShowSidebar = () => ({ type: SIDEBAR });

export const HideSidebar = () => ({ type: HIDEBAR });

export const ToggleSidebar = () => ({ type: TOGGLEBAR });

export default function reducer (state = { sidebar: false }, { type }) {
  switch (type) {
    case SIDEBAR:
      return { ...state, sidebar: true };
    case HIDEBAR:
      return { ...state, sidebar: false };
    case TOGGLEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
}
