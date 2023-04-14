import React from 'react';
import styles from '../../styles/footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_inner}>
        <ul className={styles.footer_link}>
          <li>
            <a className={styles.footer_item} href="http://www.naver.com/rules/service.html" target="_blank" rel="noopener noreferrer">
              <span className={styles.text}>이용약관</span>
            </a>
          </li>
          <li>
            <a className={styles.footer_item} href="http://www.naver.com/rules/privacy.html" target="_blank" rel="noopener noreferrer">
              <span className={styles.text}>개인정보처리방침</span>
            </a>
          </li>
          <li>
            <a className={styles.footer_item} href="http://www.naver.com/rules/disclaimer.html" target="_blank" rel="noopener noreferrer">
              <span className={styles.text}>책임의 한계와 법적고지</span>
            </a>
          </li>
          <li>
            <a className={styles.footer_item} href="https://help.naver.com/support/service/main.nhn?serviceNo=532" target="_blank" rel="noopener noreferrer">
              <span className={styles.text}>회원정보 고객센터</span>
            </a>
          </li>
        </ul>
        <div className={styles.footer_copy}>
          <a href="https://www.navercorp.com" target="_blank" rel="noopener noreferrer">
            <span className={styles.footer_logo}>
              <span className={styles.blind}>네이버</span>
            </span>
          </a>
          <span className={styles.ft_text}>Copyright</span>
          <span className={styles.corp}>© Kim Si Hyeon.</span>
          <span className={styles.ft_text}>All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
