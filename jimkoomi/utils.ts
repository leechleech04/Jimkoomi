import { TripDataState } from './types';
import { fetchWeatherData } from './api/openMeteo';

export const createNewChecklist = async ({
  latitude,
  longitude,
  startDate,
  duration,
  vehicles,
  activities,
}: TripDataState) => {
  const weatherItems = await recommendItemsByWeather(
    latitude,
    longitude,
    startDate,
    duration
  );
  const vehicleItems = recommendItemsByVehicle(vehicles);
  const activityItems = recommendItemsByActivity(activities);
  const basicItems = recommendBasicItems();
  const allItems = [
    ...basicItems,
    ...weatherItems,
    ...vehicleItems,
    ...activityItems,
  ];

  const uniqueItems = Array.from(new Set(allItems));
  const formattedItems = uniqueItems.map((item, index) =>
    item === '외출 옷' || item === '속옷' || item === '양말'
      ? {
          id: index,
          name: item,
          quantity: duration,
          isChecked: false,
          hasReminder: false,
        }
      : {
          id: index,
          name: item,
          quantity: 1,
          isChecked: false,
          hasReminder: false,
        }
  );

  return formattedItems;
};

const recommendBasicItems = () => {
  return [
    '세면도구',
    '화장품',
    '샤워용품',
    '선크림',
    '외출 옷',
    '속옷',
    '잠옷',
    '모자',
    '양말',
    '지갑',
    '휴대폰',
    '충전기',
    '이어폰',
    '보조 배터리',
    '상비약',
    '칫솔',
    '치약',
    '빗',
  ];
};

const recommendItemsByWeather = async (
  latitude: number,
  longitude: number,
  startDate: string,
  duration: number
) => {
  const weatherData = await fetchWeatherData(
    latitude,
    longitude,
    startDate,
    duration
  );
  let weatherType = '맑음';

  if (
    weatherData?.weatherCode.some((code: number) =>
      [
        51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86, 95, 96, 99,
      ].includes(code)
    )
  ) {
    weatherType = '비';
  } else if (
    weatherData?.weatherCode.some((code: number) =>
      [71, 73, 75, 77].includes(code)
    )
  ) {
    weatherType = '눈';
  }

  if (weatherType === '맑음') {
    return [];
  } else if (weatherType === '비') {
    return ['우비', '우산'];
  } else {
    return ['우산', '장갑'];
  }
};

const recommendItemsByVehicle = (vehicles: number[]) => {
  let items: string[] = [];

  if (vehicles.includes(0)) {
    items.push('항공권', '여권', '신분증');
  }

  if (vehicles.includes(1)) {
    items.push('헬멧', '자전거 잠금장치');
  }

  if (vehicles.includes(2)) {
    items.push('버스 카드', '버스 탑승권');
  }

  if (vehicles.includes(3)) {
    items.push('차량 키', '운전 면허증');
  }

  if (vehicles.includes(4)) {
    items.push('크루즈 탑승권', '여권', '멀미약', '신분증');
  }

  if (vehicles.includes(5)) {
    items.push('여객선 탑승권', '여권', '멀미약', '신분증');
  }
  if (vehicles.includes(6)) {
    items.push('지하철 카드');
  }

  if (vehicles.includes(7)) {
    items.push('기차 티켓', '신분증');
  }

  if (vehicles.includes(8)) {
    items.push('편한 신발');
  }

  return items;
};

const recommendItemsByActivity = (activities: number[]) => {
  let items: string[] = [];

  if (activities.includes(0)) {
    items.push('등산화', '등산 배낭', '등산 스틱', '손전등');
  }

  if (activities.includes(1)) {
    items.push(
      '텐트',
      '침낭',
      '캠핑 의자',
      '조리 도구',
      '모기 퇴치제',
      '손전등'
    );
  }

  if (activities.includes(2)) {
    items.push(
      '낚싯대',
      '릴',
      '낚시줄',
      '바늘',
      '미끼',
      '낚시 가방',
      '낚시 의자',
      '낚시대 홀더',
      '아이스박스'
    );
  }

  if (activities.includes(3)) {
    items.push('망원경', '휴대용 의자', '카메라');
  }

  if (activities.includes(4)) {
    items.push('돗자리', '도시락');
  }

  if (activities.includes(5)) {
    items.push('수영복', '수건', '구명조끼', '튜브');
  }

  if (activities.includes(6)) {
    items.push('수영복', '구명조끼', '수건');
  }

  if (activities.includes(7)) {
    items.push('장갑', '고글', '핫팩');
  }

  if (activities.includes(8)) {
    items.push('카메라', '여행 가이드북');
  }

  if (activities.includes(9)) {
    items.push('카메라', '소화제');
  }

  if (activities.includes(10)) {
    items.push('장바구니');
  }

  if (activities.includes(11)) {
    items.push('카메라');
  }

  if (activities.includes(12)) {
    items.push('공연 티켓', '카메라');
  }

  if (activities.includes(13)) {
    items.push('카메라', '삼각대');
  }

  if (activities.includes(14)) {
    items.push('마사지 오일', '보습제', '타올');
  }

  if (activities.includes(15)) {
    items.push('수건', '목욕용품');
  }

  if (activities.includes(16)) {
    items.push('수영복', '타올', '여행 가이드북');
  }

  if (activities.includes(17)) {
    items.push('응원 도구', '경기 티켓');
  }

  if (activities.includes(18)) {
    items.push('작업용 장갑');
  }

  if (activities.includes(19)) {
    items.push('비자', '학습 자료', '입학 서류', '숙소 예약 확인서', '필기구');
  }

  if (activities.includes(20)) {
    items.push('아기 용품');
  }

  if (activities.includes(21)) {
    items.push('업무용 서류', '노트북', '비즈니스 카드', '출장 복장');
  }

  return items;
};
