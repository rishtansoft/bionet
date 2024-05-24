import React, { useEffect, useState } from "react";

import "assets/vendor/bootstrap/css/bootstrap.min.css";
import "assets/assets/css/fontawesome.css";
import "assets/assets/css/templatemo-edu-meeting.css";
import "assets/assets/css/owl.css";
import "assets/assets/css/lightbox.css";

import higher from "assets/assets/images/meeting-03.jpg";
import training from "assets/assets/images/meeting-04.jpg";
import hero from "assets/assets/images/newBackground.jpg";
import "./style.css";

const Home = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    // Add 'active' class to the first list item of the navigation
    document.querySelector(".nav li:first-child").classList.add("active");

    // Function to show a section
    var showSection = function (section, isAnimate) {
      var direction = section.replace(/#/, "");
      var reqSection = document.querySelector(
        '.section[data-section="' + direction + '"]'
      );
      var reqSectionPos = reqSection.offsetTop - 0;

      if (isAnimate) {
        window.scrollTo({
          top: reqSectionPos,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, reqSectionPos);
      }
    };

    // Function to check which section is currently in view
    var checkSection = function () {
      var sections = document.querySelectorAll(".section");
      var scrollPosition = window.scrollY;

      sections.forEach(function (section) {
        var topEdge = section.offsetTop - 80;
        var bottomEdge = topEdge + section.offsetHeight;
        var sectionId = section.dataset.section;
        var reqLink = document.querySelector('a[href="#' + sectionId + '"]');

        if (topEdge < scrollPosition && bottomEdge > scrollPosition) {
          reqLink.closest("li").classList.add("active");
        } else {
          reqLink.closest("li").classList.remove("active");
        }
      });
    };

    // Add click event listener to the menu items and scroll-to-section links
    document.addEventListener("DOMContentLoaded", function () {
      document
        .querySelectorAll(".main-menu, .responsive-menu, .scroll-to-section")
        .forEach(function (item) {
          if (item) {
            item.addEventListener("click", function (e) {
              e.preventDefault();
              showSection(this.getAttribute("href"), true);
            });
          }
        });

      // Add scroll event listener to window
      window.addEventListener("scroll", function () {
        checkSection();
      });
    });
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setShowMobileMenu(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="sub-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-8">
              <div className="left-content">
                <p></p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4">
              <div className="right-icons">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-behance"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="index.html" className="logo">
                  BIONET
                </a>
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="#top" className="active">
                      Asosiy
                    </a>
                  </li>
                  <li>
                    <a href="#meetings">Yangiliklar</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact">Bog&apos;lanish</a>
                  </li>

                  <li className="scroll-to-section">
                    <a href="/sign-in">Kirish</a>
                  </li>
                </ul>
                <div className="mobile-view-menu">
                  <a
                    className="menu-trigger"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                  >
                    <span>Menu</span>
                  </a>
                  <div
                    className={`showMenu ${
                      showMobileMenu ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <li onMouseDown={() => {setShowMobileMenu(false)}}>
                        <a href="#top">
                          Asosiy
                        </a>
                      </li>
                      <li onMouseDown={() => {setShowMobileMenu(false)}}>
                        <a href="#meetings">Yangiliklar</a>
                      </li>
                      <li onMouseDown={() => {setShowMobileMenu(false)}}>
                        <a href="#contact">Bog&apos;lanish</a>
                      </li>
                      <li onMouseDown={() => {setShowMobileMenu(false)}}>
                        <a href="/sign-in">Kirish</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section
        className="section main-banner"
        style={{ height: "105vh" }}
        id="top"
        data-section="section1"
      >
        {/* <video autoPlay muted loop id='bg-video'>
          <source src={video} type='video/mp4' />
        </video> */}
        {/* <img src={hero} alt="" /> */}

        <div className="video-overlay header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="caption">
                  <h6>Assalomu alaykum.</h6>
                  <h2>BIONET platformasiga xush kelibsiz!</h2>
                  <p>
                    Ushbu platforma yordamida O&apos;zbekistondagi{" "}
                    <a
                      rel="nofollow noreferrer"
                      href="https://templatemo.com/page/1"
                      target="_blank"
                    >
                      Barcha maktablar
                    </a>
                    . o&apos;quvchilar davomatli bilan tanishib borishingiz,
                    ularning yillik, oylik hamda kunlik hisobotlaridan xabardor
                    bo&apos;lishingiz mumkin{" "}
                  </p>
                  <div className="main-button-red">
                    <div className="scroll-to-section">
                      <a href="#contact">Statistikalarni ko&apos;rish</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="upcoming-meetings"
        style={{ paddingTop: "100px" }}
        id="meetings"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Yangiliklar</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="categories">
                <h4>Kategoriyalar</h4>
                <ul style={{ display: "flex", flexDirection: "column" }}>
                  <li>
                    <a href="#">Maktablar</a>
                  </li>
                  <li>
                    <a href="#">Tumanlar</a>
                  </li>
                  <li>
                    <a href="#">Viloyatlar</a>
                  </li>
                  <li>
                    <a href="#">Shaharlar</a>
                  </li>
                </ul>
                <div className="main-button-red">
                  <a href="meetings.html">Barcha yangiliklarni ko&apos;rish</a>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <div className="meeting-item">
                    <div className="thumb">
                      <div className="price"></div>
                      <a href="#">
                        <img src={higher} alt="New Lecturer Meeting" />
                      </a>
                    </div>
                    <div className="down-content">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "self-start",
                          gap: "20px",
                        }}
                      >
                        <div className="date">
                          <h6>
                            Nov <span>10</span>
                          </h6>
                        </div>
                        <div>
                          <a href="#">
                            <h4>Davomat</h4>
                          </a>
                          <p>
                            Barcha maktablar bo&apos;yicha davomat
                            <br />
                            97,7 foizga yetdi .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="meeting-item">
                    <div className="thumb">
                      <div className="price"></div>
                      <a href="#">
                        <img src={training} alt="Online Teaching" />
                      </a>
                    </div>
                    <div className="down-content">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "self-start",
                          gap: "20px",
                        }}
                      >
                        <div className="date">
                          <h6>
                            Nov <span>24</span>
                          </h6>
                        </div>
                        <div>
                          <a href="#">
                            <h4>2024-2025-O&apos;QUV YILIDAN</h4>
                          </a>
                          <p>
                            “MENING MAKTABIM” LOYIHASI DOIRASIDA MAKTABLARGA
                            BAZAVIY HISOBLASH MIQDORINING 150 BAROBARIDA
                            MABLAG&apos; AJRATILADI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="meeting-item">
                    <div className="thumb">
                      <div className="price"></div>
                      <a href="#">
                        <img src={higher} alt="Higher Education" />
                      </a>
                    </div>
                    <div className="down-content">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "self-start",
                          gap: "20px",
                        }}
                      >
                        <div className="date">
                          <h6>
                            Nov <span>26</span>
                          </h6>
                        </div>
                        <div>
                          <a href="#">
                            <h4>2024-yilda</h4>
                          </a>
                          <p>
                            Maktablarda 250 mingta o&apos;quvchi o&apos;rni
                            tashkil etilishi rejalashtirilmoqda.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="meeting-item">
                    <div className="thumb">
                      <div className="price"></div>
                      <a href="#">
                        <img src={training} alt="Student Training" />
                      </a>
                    </div>
                    <div className="down-content">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "self-start",
                          gap: "20px",
                        }}
                      >
                        <div className="date">
                          <h6>
                            Nov <span>30</span>
                          </h6>
                        </div>
                        <div>
                          <a href="#">
                            <h4>2024-yilda</h4>
                          </a>
                          <p>
                            Prezident va ixtisoslashtirilgan maktablarning
                            bilimlarni baholash tizimi qo&apos;shimcha 1 000 ta
                            umumiy o&apos;rta ta&apos;lim muassasalarida joriy
                            qilinib, fanlardagi amaliy mashg&apos;ulotlar ulushi
                            60 foizgacha oshiriladi;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-facts">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <h2>Barcha maktablar bo&apos;yicha statistika</h2>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content percentage">
                        <div className="count-digit">38,5</div>
                        <div className="count-title">
                          1-4 sinf o&apos;quvchilar
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">282424</div>
                        <div className="count-title">O&apos;qtuvchilar</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content new-students">
                        <div className="count-digit">6.5 million</div>
                        <div className="count-title">O&apos;quvchilar</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">10522</div>
                        <div className="count-title">Maktablar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="video">
                <a
                  href="https://www.youtube.com/watch?v=HndV87XpkWg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="assets/images/play-icon.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us" id="contact">
        <div className="container">
          <div style={{display:'flex', gap: '30px'}} className="feedback-part">
            <div className="inputs-part">
              <div className="row">
                <div className="">
                  <form id="contact" action="" method="post">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>Murojatlar uchun</h2>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="name"
                            type="text"
                            id="name"
                            placeholder="ISMINGIZ..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="email"
                            type="text"
                            id="email"
                            pattern="[^ @]*@[^ @]*"
                            placeholder="ELEKTRON POCHTA MANZILINGIZ..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-4">
                        <fieldset>
                          <input
                            name="subject"
                            type="text"
                            id="subject"
                            placeholder="MAVZU..."
                            required=""
                          />
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <textarea
                            name="message"
                            type="text"
                            className="form-control"
                            id="message"
                            placeholder="XABARINGIZ..."
                            required=""
                          ></textarea>
                        </fieldset>
                      </div>
                      <div className="col-lg-12">
                        <fieldset>
                          <button id="form-submit" className="button">
                            Xabarni yuborish
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="contacts-part">
              <div className="right-info">
                <ul>
                  <li>
                    <h6>Telefon raqam</h6>
                    <span>+998901234567</span>
                  </li>
                  <li>
                    <h6>Elektron pochta</h6>
                    <span>info@meeting.edu</span>
                  </li>
                  <li>
                    <h6>Manzil</h6>
                    <span>Rio de Janeiro - RJ, 22795-008, Brazil</span>
                  </li>
                  <li>
                    <h6>Sayt manzil</h6>
                    <span>www.meeting.edu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="footer">
          <p>2024-yil 
            <br />
            Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a>
            <br />
            BIONET: <a href="#" target="_blank" title="Build Better UI, Faster">ThemeWagon</a>
            </p>
        </div> */}
      </section>
    </>
  );
};

export default Home;
