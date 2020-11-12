import React from 'react';
import '../styles/IndexPodcastEp.scss';
import Button from '@material-ui/core/Button';
import { BiFastForward } from 'react-icons/bi';


let current = 0;
function IndexPodcastEp(props) {
  function handleActiveDot(e) {
    let current = e.target.dataset.id;
    // console.log(current);
    if (
      e.target
        .closest('.card-movie-navigation__list')
        .querySelector('.is-active')
    ) {
      // console.log('HI')
      e.target
        .closest('.card-movie-navigation__list')
        .querySelector('.is-active')
        .classList.remove('is-active');
    }
    e.target.classList.add('is-active');

    document
      .querySelector('.card-movie-carousel')
      .querySelector('.card-movie--active')
      .classList.remove('card-movie--active');
    document
      .querySelectorAll('.card-movie')
      [current].classList.add('card-movie--active');

    // console.log(e.target)
  }


  return (
    <>
      <div className="card-movie-container">
        <div className="IndexChannelEpTitleBox d-flex">
          <h3 className="IndexChannelEpTitle mx-auto my-auto">熱門單集</h3>
        </div>
        <div className="card-movie-wrapper card-movie-wrapper--centered mx-auto">
          <div className="card-movie-carousel">
            <div className="card-movie card-movie--light card-movie--looper card-movie--active">
              <div className="card-movie__content">
                <div className="card-movie__title">Looper</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2012</span>

                  <span className="card-movie__details-item">119 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Action</li>
                    <li>Crime</li>
                    <li>Sci-fi</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    In 2074, when the mob wants to get rid of someone, the
                    target is sent into the past, where a hired gun
                    awaits&nbsp;-&nbsp;someone like Joe.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">7.5</div>

              <div
                className="card-movie__player"
                data-trailer="5kGFyVKmqA0"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--looper --> */}

            <div className="card-movie card-movie--dark card-movie--tron">
              <div className="card-movie__content">
                <div className="card-movie__title">Tron: Legacy</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2010</span>

                  <span className="card-movie__details-item">125 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Action</li>
                    <li>Adventure</li>
                    <li>Fantasy</li>
                    <li>Sci-fi</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    The son of a virtual world designer goes looking for his
                    father and ends up inside the digital world that his father
                    designed. He meets his father's corrupted creation and a
                    unique ally who was born inside the digital world.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">6.8</div>

              <div
                className="card-movie__player"
                data-trailer="L9szn1QQfas"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--tron --> */}

            <div className="card-movie card-movie--light card-movie--garden-state">
              <div className="card-movie__content">
                <div className="card-movie__title">Garden State</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2004</span>

                  <span className="card-movie__details-item">102 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Comedy</li>
                    <li>Drama</li>
                    <li>Romance</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    A quietly troubled young man returns home for his mother's
                    funeral after being estranged from his family for a decade.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">7.6</div>

              <div
                className="card-movie__player"
                data-trailer="u82n0e1mgmQ"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--garden-state --> */}

            <div className="card-movie card-movie--light card-movie--interstellar">
              <div className="card-movie__content">
                <div className="card-movie__title">Interstellar</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2014</span>

                  <span className="card-movie__details-item">169 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Adventure</li>
                    <li>Drama</li>
                    <li>Sci-fi</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    With our time on Earth coming to an end, a team of explorers
                    undertakes the most important mission in human history;
                    traveling beyond this galaxy to discover whether mankind has
                    a future among the stars.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">8.7</div>

              <div
                className="card-movie__player"
                data-trailer="3WzHXI5HizQ"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--interstellar --> */}

            <div className="card-movie card-movie--light card-movie--walter-mitty">
              <div className="card-movie__content">
                <div className="card-movie__title">Walter Mitty</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2013</span>

                  <span className="card-movie__details-item">114 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Adventure</li>
                    <li>Comedy</li>
                    <li>Drama</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    When his job along with that of his co-worker are
                    threatened, Walter takes action in the real world embarking
                    on a global journey that turns into an adventure more
                    extraordinary than anything he could have ever imagined.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">7.4</div>

              <div
                className="card-movie__player"
                data-trailer="QD6cy4PBQPI"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--walter-mitty --> */}

            <div className="card-movie card-movie--dark card-movie--cloud-atlas">
              <div className="card-movie__content">
                <div className="card-movie__title">Cloud Atlas</div>

                <div className="card-movie__details">
                  <span className="card-movie__details-item">2012</span>

                  <span className="card-movie__details-item">172 mins</span>

                  <ul className="card-movie__details-item card-movie__details-list">
                    <li>Drama</li>
                    <li>Sci-Fi</li>
                  </ul>
                </div>
                {/* <!-- /.card-movie__details --> */}

                <div className="card-movie__description">
                  <p>
                    An exploration of how the actions of individual lives impact
                    one another in the past, present and future, as one soul is
                    shaped from a killer into a hero, and an act of kindness
                    ripples across centuries to inspire a revolution.
                  </p>
                </div>
                {/* <!-- /.card-movie__description --> */}
              </div>
              {/* <!-- /.card-movie__content --> */}

              <div className="card-movie__rating">7.5</div>

              <div
                className="card-movie__player"
                data-trailer="hWnAqFyaQ5s"
              ></div>
              {/* <!-- /.card-movie__player --> */}
            </div>
            {/* <!-- /.card-movie card-movie--cloud-atlas --> */}
          </div>
          {/* <!-- /.card-movie-carousel --> */}

          <div className="card-movie-navigation">
            <ul className="card-movie-navigation__list" data-navigation>
              <li
                className="is-active"
                onMouseEnter={(e) => handleActiveDot(e)}
                data-id="0"
              ></li>
              <li onMouseEnter={(e) => handleActiveDot(e)} data-id="1"></li>
              <li onMouseEnter={(e) => handleActiveDot(e)} data-id="2"></li>
              <li onMouseEnter={(e) => handleActiveDot(e)} data-id="3"></li>
              <li onMouseEnter={(e) => handleActiveDot(e)} data-id="4"></li>
              <li onMouseEnter={(e) => handleActiveDot(e)} data-id="5"></li>
            </ul>
            {/* <!-- /.card-movie-navigation__list --> */}

            <Button className=" d-flex mt-2 mx-auto">
              更多優質內容
              <BiFastForward />
            </Button>
          </div>
          {/* <!-- /.card-movie-navigation --> */}
        </div>
        {/* <!-- /.card-movie-wrapper --> */}

        <div className="EpColorCard"></div>
      </div>
    </>
  );
}

export default IndexPodcastEp;
