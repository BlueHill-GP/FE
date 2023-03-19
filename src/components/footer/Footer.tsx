import { logowhite } from "../../assets";
import "../../assets/css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_Content">
        <div className="right_Footer">
          <div className="logo">
            <img alt="" src={logowhite} />
          </div>
          <div className="cooperate">
            <a href="">Hợp tác với chúng tôi</a>
          </div>
          <div className="payment_Partner"></div>
        </div>
        <div className="left_Footer">
          <div className="footer_List">
            <ul className="footer_Item">
              <li className="title">
                <a href="">Về CuoidiCuoidi</a>
              </li>
              <li>
                <a href="">Cách đặt lịch</a>
              </li>
              <li>
                <a href="">Liên hệ chúng tôi</a>
              </li>
              <li>
                <a href="">Trợ giúp</a>
              </li>
            </ul>
            <ul className="footer_Item">
              <li className="title">
                <a href="">Sản Phẩm</a>
              </li>
              <li>
                <a href="">Đặt lịch chụp ảnh</a>
              </li>
              <li>
                <a href="">Đặt lịch trang điểm</a>
              </li>
            </ul>
            <ul className="footer_Item">
              <li className="title">
                <a href="">Theo dõi chúng tôi trên</a>
              </li>
              <li>
                <a href="">Facebook</a>
              </li>
              <li>
                <a href="">Youtube</a>
              </li>
              <li>
                <a href="">Tiktok</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="by">
        <p>
          Công ty TNHH Cuoidi Cuoidi Việt Nam. Tòa nhà KTX khu A, 101B Lê Hữu
          Trác , TP Đà Nãng
        </p>
        <p>Copyright © 2023 Cuoidi Cuoidi</p>
      </div>
    </footer>
  );
}
export default Footer;
