import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function DetailFooter() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '345px', backgroundColor: '#e9e9e9' }}
    >
      <Box color="#616161" sx={{ margin: '0 auto', width: '540px' }}>
        <Typography fontSize="22px">상세설명</Typography>
        <br />
        <Typography whiteSpace="pre-line" fontSize="20px">
          ・ 이벤트 참여 완료 시 네이버 페이 포인트가 지급되며, Npay
          {'>'}
          포인트에서 지급 여부를 확인할 수 있습니다.
          {' '}
          <br />
          ・ 본 이벤트는 당사 및 제휴사의 사정에 따라 변경 또는 조기종료될 수 있습니다.
          <br />
          ・ 네트워크 장애 발생 시, 이벤트 참여 후 포인트 지급까지 시간이 다소 지연될 수 있습니다.
          <br />
          ・ 포인트 지급을 받지 못하신 경우 광고 목록 하단의 이용문의 메뉴를 통해 문의주세요.

        </Typography>
      </Box>
    </Box>
  );
}

export default DetailFooter;
