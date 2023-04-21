import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { UriCard, KookminCard, ShinhanCard } from '../../../src/component/CardDetail';
import DetailHeader from '../../../src/component/DetailHeader';
import DetailFooter from '../../../src/component/DetailFooter';

const GetPointButton = styled(Button)(() => ({
  marginTop: '80px',
  marginBottom: '40px',
  fontSize: '26px',
  fontWeight: 'bolder',
  backgroundColor: '#09b65a',
  height: '84px',
}));

const ApplyEventButton = styled(Button)(() => ({
  width: '270px',
  marginTop: '60px',
  marginBottom: '50px',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: '#ff406b',
  borderRadius: '50px',
  height: '56px',
}
));

function AdContainer(adType: string, data: any) {
  const { description, product_point } = data;
  if (adType === '기본') {
    return (
      <div>
        <Typography marginTop="40px" fontSize="28px" fontWeight="bold" color="black">{description}</Typography>
        <Typography marginTop="14px" fontSize="22px" color="#888888">
          네이버 포인트
          {' '}
          {product_point}
          원 지급!
          {' '}
        </Typography>
      </div>
    );
  } if (adType === '신한') {
    return <ShinhanCard data={data} />;
  } if (adType === '우리') {
    return <UriCard data={data} />;
  } if (adType === '국민') {
    return <KookminCard data={data} />;
  }
}

function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [boxSize, setBoxSize] = useState(540);
  // 기본, 신한, 우리, 국민
  const [adType, setAdType] = useState('기본');

  useEffect(() => {
    axios.get(`/api/product/ads/${id}`).then((res) => res.data)
      .then((res) => {
        if (res.statusCode === 200) {
          setData(res.data);
          if (res.data.category === 'card') {
            setBoxSize(680);
            setAdType((res.data.name).slice(-4, -2));
          }
        }
      });
  }, []);

  const onClickGetPoint = () => {
    axios.patch(`/api/product/ads/${id}/user-status`).then((res) => res.data)
      .then((res) => {
        if (res.statusCode === 200) {
          alert('참여완료 됐습니다.');
          router.push('/product');
        }
      });
  };

  const GotoCardLink = () => {
    if (adType === '신한') {
      router.push('https://www.shinhancard.com/evt/MOBEVENTN/MOBEVT024R10.shc?rvN=2023032715HMPG&rtrn_url=https://campaign.naver.com/event/npay-shinhanassociated_2304?request_id=20230419T150443_46e41152ef9d453397552f2e31522881&placement=benefit_group_card&inventory=pay%3Ebenefit_group');
    } else if (adType === '우리') {
      router.push('https://m.wooricard.com/dcmw/yh1/bnf/bnf02/prgevnt/movePrgEvntDtl.do?evntSrno=30002294');
    } else if (adType === '국민') {
      router.push('https://card.kbcard.com/BON/DVIEW/HBBMCXCRVNECD0001?evtNo=156&chn=');
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <DetailHeader />
      {/* 메인 광고 박스 */}
      <Box display="flex" flex={1} sx={{backgroundColor: 'white'}}>
        <Grid container flex={1} direction="column" alignItems="center" width={boxSize}>
          <Grid>
            <img alt="product_img" width={boxSize} src={data.detail_img} />
          </Grid>
          <Grid width={boxSize}>
            {AdContainer(adType, data)}
          </Grid>
          <Grid width={boxSize} display="flex" justifyContent="center" alignItems="center">
            {adType === '기본'
              ? <GetPointButton variant="contained" fullWidth onClick={onClickGetPoint}>참여하고 포인트 받기</GetPointButton>
              : <ApplyEventButton variant="contained" onClick={GotoCardLink}>이벤트 응모하기</ApplyEventButton>}
          </Grid>
        </Grid>
      </Box>
      {/* 상세 설명 */}
      <DetailFooter />
    </Box>
  );
}
export default ProductDetailPage;
