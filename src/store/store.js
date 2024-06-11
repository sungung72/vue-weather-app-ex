//store.js에 Vuex로 전역 데이터를 관리하는 로직을 작성
import { createStore } from 'vuex';

// store 만들기
export default createStore({
    state: {
        // initial state
        count: 0,
        weatherData: {
            icon: 'icon',
            temp: 0,
            text: 'text',
            location: 'location',
            city: 'Seoul',
        },
        toggle: false, // true일때 about을 보여주기
    },
    mutations: {
        // mutations(데이터 변경)
        // commit()으로 mutations 함수를 호출하여 상태변경 가능
        addCount(state, payload) {
            state.count += 1 + payload;
        },
        updateWeather(state, payload) { //payload 가 36줄의 data 값이다.
            state.weatherData.icon = payload.weather[0].icon; //아이콘 저장
            state.weatherData.temp = payload.main.temp;       //온도 저장
            state.weatherData.text = payload.weather[0].description;
            state.weatherData.location = payload.sys.country;
            state.weatherData.city = payload.name;
        },
        onSearchCity(state, payload) {
            state.weatherData.city = payload;
        },
        toggleButton(state) {
            state.toggle = !state.toggle; //true면 false , false면 true
        }
    },
    actions: {
        // 날씨 데이터 가져오기
        getWeather(context) {  //context는 전역객체 이걸로 state를 참조할수있다.
            const API_KEY = import.meta.env.VITE_API_KEY; //import.meta.env.변수명(환경변수 불러오는 문법)
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${API_KEY}`
            //console.log(API_KEY)
            fetch(API_URL)
            .then(res => res.json()) //서버에서 받은 데이터는 바로 쓸 수있는게 아니라 json 형태로 변환해줘야 한다.
            .then(data => {          //data 는 변환된 데이터
                console.log(data);
                // mutation 함수로 날씨 정보 업데이트
                context.commit('updateWeather', data); //data는 페이로드라고 해서 mutations 함수쪽으로 전달되는 값이다.
            })
            .catch(err => {
                alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            })
        }
    }
})

// context.state.변수명
// context 객체를 통해 store 안에 있는 state 변수를 가져옴

// .gitignore (깃헙 저장소에 올릴때 포함되지 않는 폴더 및 파일들)