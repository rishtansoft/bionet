import React, { useEffect } from 'react';
import Map from 'components/map/Map';
import 'assets/vendor/bootstrap/css/bootstrap.min.css';
import 'assets/assets/css/fontawesome.css';
import 'assets/assets/css/templatemo-edu-meeting.css';
import 'assets/assets/css/owl.css';
import 'assets/assets/css/lightbox.css';

import 'assets/vendor/jquery/jquery.min.js';
import 'assets/assets/js/lightbox.js';
import 'assets/assets/js/tabs.js';
import 'assets/assets/js/video.js';
import 'assets/assets/js/slick-slider.js';

import img1 from 'assets/assets/images/service-icon-01.png';
import onlineTeaching from 'assets/assets/images/meeting-01.jpg';
import higher from 'assets/assets/images/meeting-03.jpg';
import training from 'assets/assets/images/meeting-04.jpg';
import hero from 'assets/assets/images/newBackground.jpg';
import map from 'assets/assets/images/uz1.svg';
const Home = () => {
  useEffect(() => {
    // Add 'active' class to the first list item of the navigation
    document.querySelector('.nav li:first-child').classList.add('active');

    // Function to show a section
    var showSection = function (section, isAnimate) {
      var direction = section.replace(/#/, '');
      var reqSection = document.querySelector(
        '.section[data-section="' + direction + '"]'
      );
      var reqSectionPos = reqSection.offsetTop - 0;

      if (isAnimate) {
        window.scrollTo({
          top: reqSectionPos,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo(0, reqSectionPos);
      }
    };

    // Function to check which section is currently in view
    var checkSection = function () {
      var sections = document.querySelectorAll('.section');
      var scrollPosition = window.scrollY;

      sections.forEach(function (section) {
        var topEdge = section.offsetTop - 80;
        var bottomEdge = topEdge + section.offsetHeight;
        var sectionId = section.dataset.section;
        var reqLink = document.querySelector('a[href="#' + sectionId + '"]');

        if (topEdge < scrollPosition && bottomEdge > scrollPosition) {
          reqLink.closest('li').classList.add('active');
        } else {
          reqLink.closest('li').classList.remove('active');
        }
      });
    };

    // Add click event listener to the menu items and scroll-to-section links
    document.addEventListener('DOMContentLoaded', function () {
      document
        .querySelectorAll('.main-menu, .responsive-menu, .scroll-to-section')
        .forEach(function (item) {
            if (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    showSection(this.getAttribute('href'), true);
                  });
            }
          
        });

      // Add scroll event listener to window
      window.addEventListener('scroll', function () {
        checkSection();
      });
    });
  }, []);

  return (
    <>
      <div className='sub-header'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-sm-8'>
              <div className='left-content'>
                <p>
                  
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-sm-4'>
              <div className='right-icons'>
                <ul>
                  <li>
                    <a href='#'>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fa fa-behance'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fa fa-linkedin'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className='header-area header-sticky'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <nav className='main-nav'>
                <a href='index.html' className='logo'>
                  BIONET
                </a>
                <ul className='nav'>
                  <li className='scroll-to-section'>
                    <a href='#top' className='active'>
                      Asosiy
                    </a>
                  </li>
                  <li>
                    <a href='#meetings'>Yangiliklar</a>
                  </li>
                  <li className='scroll-to-section'>
                    <a href='#apply'>Bog&apos;lanish</a>
                  </li>
                  
                  <li className='scroll-to-section'>
                    <a href='#contact'>Kirish</a>
                  </li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section className='section main-banner' style={{height: '110vh'}} id='top' data-section='section1'>
        {/* <video autoPlay muted loop id='bg-video'>
          <source src={video} type='video/mp4' />
        </video> */}
        <img src={hero} alt="" />

        <div className='video-overlay header-text'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='caption'>
                  <h6>Hello Students</h6>
                  <h2>Welcome to Education</h2>
                  <p>
                    This is an edu meeting HTML CSS template provided by{' '}
                    <a
                      rel='nofollow noreferrer'
                      href='https://templatemo.com/page/1'
                      target='_blank'
                    >
                      TemplateMo website
                    </a>
                    . This is a Bootstrap v5.1.3 layout. The video background is
                    taken from Pexels website, a group of young people by{' '}
                    <a
                      rel='nofollow noreferrer'
                      href='https://www.pexels.com/@pressmaster'
                      target='_blank'
                    >
                      Pressmaster
                    </a>
                    .
                  </p>
                  <div className='main-button-red'>
                    <div className='scroll-to-section'>
                      <a href='#contact'>Join Us Now!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='upcoming-meetings' style={{paddingTop: "100px"}} id='meetings'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='section-heading'>
                <h2>Yangiliklar</h2>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='categories'>
                <h4>Kategoriyalar</h4>
                <ul>
                  <li>
                    <a href='#'>Sed tempus enim leo</a>
                  </li>
                  <li>
                    <a href='#'>Aenean molestie quis</a>
                  </li>
                  <li>
                    <a href='#'>Cras et metus vestibulum</a>
                  </li>
                  <li>
                    <a href='#'>Nam et condimentum</a>
                  </li>
                  <li>
                    <a href='#'>Phasellus nec sapien</a>
                  </li>
                </ul>
                <div className='main-button-red'>
                  <a href='meetings.html'>Barcha yangiliklarni ko&apos;rish</a>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='meeting-item'>
                    <div className='thumb'>
                      <div className='price'>
                        <span>$22.00</span>
                      </div>
                      <a href='meeting-details.html'>
                        <img
                          src={onlineTeaching}
                          alt='New Lecturer Meeting'
                        />
                      </a>
                    </div>
                    <div className='down-content'>
                      <div className='date'>
                        <h6>
                          Nov <span>10</span>
                        </h6>
                      </div>
                      <a href='meeting-details.html'>
                        <h4>New Lecturers Meeting</h4>
                      </a>
                      <p>
                        Morbi in libero blandit lectus
                        <br />
                        cursus ullamcorper.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='meeting-item'>
                    <div className='thumb'>
                      <div className='price'>
                        <span>$36.00</span>
                      </div>
                      <a href='meeting-details.html'>
                        <img
                          src={onlineTeaching}
                          alt='Online Teaching'
                        />
                      </a>
                    </div>
                    <div className='down-content'>
                      <div className='date'>
                        <h6>
                          Nov <span>24</span>
                        </h6>
                      </div>
                      <a href='meeting-details.html'>
                        <h4>Online Teaching Techniques</h4>
                      </a>
                      <p>
                        Morbi in libero blandit lectus
                        <br />
                        cursus ullamcorper.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='meeting-item'>
                    <div className='thumb'>
                      <div className='price'>
                        <span>$14.00</span>
                      </div>
                      <a href='meeting-details.html'>
                        <img
                          src={higher}
                          alt='Higher Education'
                        />
                      </a>
                    </div>
                    <div className='down-content'>
                      <div className='date'>
                        <h6>
                          Nov <span>26</span>
                        </h6>
                      </div>
                      <a href='meeting-details.html'>
                        <h4>Higher Education Conference</h4>
                      </a>
                      <p>
                        Morbi in libero blandit lectus
                        <br />
                        cursus ullamcorper.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='meeting-item'>
                    <div className='thumb'>
                      <div className='price'>
                        <span>$48.00</span>
                      </div>
                      <a href='meeting-details.html'>
                        <img
                          src={training}
                          alt='Student Training'
                        />
                      </a>
                    </div>
                    <div className='down-content'>
                      <div className='date'>
                        <h6>
                          Nov <span>30</span>
                        </h6>
                      </div>
                      <a href='meeting-details.html'>
                        <h4>Student Training Meetup</h4>
                      </a>
                      <p>
                        Morbi in libero blandit lectus
                        <br />
                        cursus ullamcorper.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='our-facts'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='row'>
                <div className='col-lg-12'>
                  <h2>A Few Facts About Our University</h2>
                </div>
                <div className='col-lg-6'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='count-area-content percentage'>
                        <div className='count-digit'>94</div>
                        <div className='count-title'>Succesed Students</div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='count-area-content'>
                        <div className='count-digit'>126</div>
                        <div className='count-title'>Current Teachers</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='count-area-content new-students'>
                        <div className='count-digit'>2345</div>
                        <div className='count-title'>New Students</div>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='count-area-content'>
                        <div className='count-digit'>32</div>
                        <div className='count-title'>Awards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 align-self-center'>
              <div className='video'>
                <a
                  href='https://www.youtube.com/watch?v=HndV87XpkWg'
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src='assets/images/play-icon.png' alt='' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='contact-us' id='contact'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-9 align-self-center'>
              <div className='row'>
                <div className='col-lg-12'>
                  <form id='contact' action='' method='post'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <h2>Let&lsquo;s get in touch</h2>
                      </div>
                      <div className='col-lg-4'>
                        <fieldset>
                          <input
                            name='name'
                            type='text'
                            id='name'
                            placeholder='YOURNAME...*'
                            required=''
                          />
                        </fieldset>
                      </div>
                      <div className='col-lg-4'>
                        <fieldset>
                          <input
                            name='email'
                            type='text'
                            id='email'
                            pattern='[^ @]*@[^ @]*'
                            placeholder='YOUR EMAIL...'
                            required=''
                          />
                        </fieldset>
                      </div>
                      <div className='col-lg-4'>
                        <fieldset>
                          <input
                            name='subject'
                            type='text'
                            id='subject'
                            placeholder='SUBJECT...*'
                            required=''
                          />
                        </fieldset>
                      </div>
                      <div className='col-lg-12'>
                        <fieldset>
                          <textarea
                            name='message'
                            type='text'
                            className='form-control'
                            id='message'
                            placeholder='YOUR MESSAGE...'
                            required=''
                          ></textarea>
                        </fieldset>
                      </div>
                      <div className='col-lg-12'>
                        <fieldset>
                          <button
                            type='submit'
                            id='form-submit'
                            className='button'
                          >
                            SEND MESSAGE NOW
                          </button>
                        </fieldset>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='col-lg-3'>
              <div className='right-info'>
                <ul>
                  <li>
                    <h6>Phone Number</h6>
                    <span>010-020-0340</span>
                  </li>
                  <li>
                    <h6>Email Address</h6>
                    <span>info@meeting.edu</span>
                  </li>
                  <li>
                    <h6>Street Address</h6>
                    <span>Rio de Janeiro - RJ, 22795-008, Brazil</span>
                  </li>
                  <li>
                    <h6>Website URL</h6>
                    <span>www.meeting.edu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
        <p>2024-yil 
            <br />
            Design: <a href="https://templatemo.com" target="_parent" title="free css templates">TemplateMo</a>
            <br />
            BIONET: <a href="#" target="_blank" title="Build Better UI, Faster">ThemeWagon</a>
            </p>
        </div>
      </section>
    </>
  );
};

export default Home;
