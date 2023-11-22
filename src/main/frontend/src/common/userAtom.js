import { atom, selector } from 'recoil';
import { recoilPersist } from "recoil-persist";


const { persistAtom } = recoilPersist({
  key: 'recoil-persist-userinfo', 
  storage: localStorage, 
  converter: JSON 
}
)

let userAtom = atom({
  key: 'simple_userinfo',  
  default: [] ,
  effects_UNSTABLE: [persistAtom],
});


export const isLoginSelector = selector({
  key : 'isLoginSelector',
  get : ({get}) => !!get(userAtom)

});



export default userAtom;