import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SubTitle = styled(Typography)(() => ({
  marginTop: '20px',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#ff406b',
}));
function UriCard(props: {data: any}) {
  const { data } = props;
  const startDate = new Date(data.start_at);
  const endDate = new Date(data.end_at);
  const startDateFormat = `${startDate.getFullYear()}년 ${startDate.getMonth()}월 ${startDate.getDay()}일`;
  const endDateFormat = `${endDate.getFullYear()}년 ${endDate.getMonth()}월 ${endDate.getDay()}일`;

  return (
    <div>
      <SubTitle>이벤트 기간</SubTitle>
      <Typography>{`${startDateFormat} ~ ${endDateFormat}`}</Typography>
      <SubTitle>혜택</SubTitle>
      <Typography whiteSpace="pre-line">
        혜택 ① : 12만P 온라인 채널을 통해 대상카드를 소지한 본인 회원 중 아래의 조건을 충족하는 회원
        <br />
        혜택 ② : 5만P 생활요금 5개 업종 아파트 관리비 / 휴대폰 요금 / 도시가스 / 전기요금 / 4대보험 자동납부 신청 및 납부 완료시
      </Typography>

      <SubTitle>참여 대상</SubTitle>
      <Typography whiteSpace="pre-line">
        온라인 채널을 통해 대상카드를 소지한 본인 회원 중 아래의 조건을 충족하는 회원
        <br />
        ① 이벤트 직전 6개월(기간 : 2022.10.1 ~ 2023.3.31)동안 우리 신용카드 사용 이력이 없는 회원
        <br />
        ② 이벤트 직전 1년간(기간 : 2022.4.1 ~ 2023.3.31) 각 제휴사에서 진행한 우리 신용카드 이용 이벤트 혜택 지급 이력이 없는 회원
        <br />
      </Typography>
    </div>
  );
}

function KookminCard(props: {data: any}) {
  const { data } = props;
  const startDate = new Date(data.start_at);
  const endDate = new Date(data.end_at);
  const startDateFormat = `${startDate.getFullYear()}년 ${startDate.getMonth()}월 ${startDate.getDay()}일`;
  const endDateFormat = `${endDate.getFullYear()}년 ${endDate.getMonth()}월 ${endDate.getDay()}일`;

  return (
    <div>
      <SubTitle>이벤트 기간</SubTitle>
      <Typography>{`${startDateFormat} ~ ${endDateFormat}`}</Typography>
      <SubTitle>혜택</SubTitle>
      <Typography whiteSpace="pre-line">
        혜택 ① : 2023년 4월1일 ~ 2023년 5월 15일 기간 동안 대상카드로 13만원 이상 결제 시 네이버페이 포인트 13만원 적립
        <br />
        혜택 ② : 혜택① 조건 충족 대상자 중 2023년 4월1일 ~ 2023년 5월 15일 기간 동안 대상카드를 KB Pay에 신규 등록하고 KB Pay로 
        1만원 이상 이용 시 1만원 캐시백 추가 제공
      </Typography>
      <SubTitle>참여 대상</SubTitle>
      <Typography whiteSpace="pre-line">
        3가지 조건 충족 시 포인트 혜택 수령 가능
        <br />
        1)이벤트 시작일 기준 직전 6개월 간 KB국민 신용카드 결제 이력이 없는 회원
        <br />
        2)본 이벤트에서 응모 필수
        <br />
        3)온라인 채널(PC,모바일)을 통해 이벤트 대상 카드를 발급 받은 회원
        <br />
        ※1인 1회 / 모바일 단독카드는 행사 대상에서 제외
        <br />
        ※온라인 카드발급 고객 대상 기타 이용조건 이벤트 및 연회비 캐시백 이벤트 중복 적용 불가
      </Typography>
    </div>
  );
}

function ShinhanCard(props: {data: any}) {
  const { data } = props;
  const startDate = new Date(data.start_at);
  const endDate = new Date(data.end_at);
  const startDateFormat = `${startDate.getFullYear()}년 ${startDate.getMonth()}월 ${startDate.getDay()}일`;
  const endDateFormat = `${endDate.getFullYear()}년 ${endDate.getMonth()}월 ${endDate.getDay()}일`;

  return (
    <div>
      <SubTitle>이벤트 기간</SubTitle>
      <Typography>{`${startDateFormat} ~ ${endDateFormat}`}</Typography>
      <SubTitle>혜택 및 참여 조건</SubTitle>
      <Typography whiteSpace="pre-line">
        특별혜택 최대 15만원
        <br />
        6개월간 신한 신용카드를 이용한적이 없다면
        <br />
        포인트 혜택 최대 10%
        <br />
        네이버 플러스 멤버십 가입하고 네이버 장보기 이용하면
        <br />
        멤버쉽 헤택 최대 1만원
        <br />
        네이버 플러스 멤버십 자동결제 등록하면
        <br />
        자동납부 혜택 최대 4만원
        <br />
        생활요금 자동이체 연결 및 결제 이용 시
        <br />
      </Typography>
    </div>
  );
}

export { UriCard, KookminCard, ShinhanCard };
