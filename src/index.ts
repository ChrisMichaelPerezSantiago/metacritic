import { load } from 'cheerio'
import { req } from './utils/index';
import { BASE_URL } from './urls/index';
import { GamesParamsOptions } from './interfaces/games'
import { MoviesParamsOptions } from './interfaces/movies';
import { TVParamsOptions } from './interfaces/tv';


export const getGameReviews = async(options: GamesParamsOptions) =>{
  const res = await req(`${BASE_URL}/browse/games/release-date/${options.filterBy}/${options.platform}/${options.sortBy}`);
  const $ = load(res);

  let reviews = $('body.skybox-auto-collapse div#page table.clamp-list tbody tr').map((_index: number, element: CheerioElement) => 
    new Promise(async(resolve, _reject) =>{
      
        const $element = $(element);
        const poster = $element.find('td.clamp-image-wrap a img').attr('src') || null;
        let id = $element.find('td.clamp-summary-wrap a.title').attr('href') || null;
        const title = $element.find('td.clamp-summary-wrap a.title h3').text() || null;
        const _score = $element.find('td.clamp-summary-wrap div.clamp-score-wrap a.metascore_anchor div.metascore_w').text() || null;
        const score = parseInt(_score, 10) || null;
        const _platform = $element.find('td.clamp-summary-wrap div.clamp-details span').text().trim().split('\n') || null;
        const platform = _platform ? String(_platform[1]).trim() : null;
        const release_date = _platform ? String(_platform[2]).trim() : null;

        const _summary = $element.find('td.clamp-summary-wrap div.summary').text().split('\n' , 2) || null;
        const summary = (_summary ? (_summary[0].includes('') ? String(_summary[1]).trim() : null) : null) || null;
        
        if(id === null){
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            platform: platform,
            extra: null
          });
        }else{
          const _id = `${BASE_URL}` + id;
          const extra =  await getGameInfoReview(_id);
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            platform: platform,
            extra: extra
          });
        }
    })
  ).get();
  
  return Promise.all(reviews);
};

export const getMoviesReviews = async(options: MoviesParamsOptions) =>{
  const res = await req(`${BASE_URL}/browse/movies/score/metascore/year/filtered?year_selected=${options.year}&sort=desc&view=detailed`);
  const $ = load(res);

  let reviews = $('body.skybox-auto-collapse div#page table.clamp-list tbody tr').map((_index: number, element: CheerioElement) => 
    new Promise(async(resolve, _reject) =>{
        const $element = $(element);
        const poster = $element.find('td.clamp-image-wrap a img').attr('src') || null;
        let id = $element.find('td.clamp-summary-wrap a.title').attr('href') || null;
        const title = $element.find('td.clamp-summary-wrap a.title h3').text() || null;
        const _score = $element.find('td.clamp-summary-wrap div.clamp-score-wrap a.metascore_anchor div.metascore_w').text() || null;
        const score = parseInt(_score, 10) || null;
        const d = $element.find('td.clamp-summary-wrap div.clamp-details span').text().split('|') || null;
        const release_date = d ? String(d[0]).trim() : null;
        const rating = d ? String(d[1]).trim() : null 
        const _summary = $element.find('td.clamp-summary-wrap div.summary').text().split('\n' , 2) || null;
        const summary = (_summary ? (_summary[0].includes('') ? String(_summary[1]).trim() : null) : null) || null;
        
        if(id === null){
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            rating: rating,
            extra: null
          });
        }else{
          const _id = `${BASE_URL}` + id;
          const extra =  await getMoviesInfoReview(_id);
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            rating: rating,
            extra: extra
          });
        }
    })
  ).get();

  return Promise.all(reviews);
};

export const getTVReviews = async(options: TVParamsOptions) =>{
  const res = await req(`${BASE_URL}/browse/tv/release-date/${options.filterBy}/${options.sortBy}`);
  const $ = load(res);

  let reviews = $('body.skybox-auto-collapse div#page table.clamp-list tbody tr').map((_index: number, element: CheerioElement) => 
    new Promise(async(resolve, _reject) =>{
        const $element = $(element);
        const poster = $element.find('td.clamp-image-wrap a img').attr('src') || null;
        let id = $element.find('td.clamp-summary-wrap a.title').attr('href') || null;
        const title = $element.find('td.clamp-summary-wrap a.title h3').text() || null;
        const _score = $element.find('td.clamp-summary-wrap div.clamp-score-wrap a.metascore_anchor div.metascore_w').text() || null;
        const score = parseInt(_score, 10) || null;
        const release_date = $element.find('td.clamp-summary-wrap div.clamp-details span').text() || null;
        const _summary = $element.find('td.clamp-summary-wrap div.summary').text().split('\n' , 2) || null;
        const summary = (_summary ? (_summary[0].includes('') ? String(_summary[1]).trim() : null) : null) || null;

        if(id === null){
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            extra: null
          });
        }else{
          const _id = `${BASE_URL}` + id;
          const extra = await getTVInfoReview(_id);
          resolve({
            title: title,
            poster: poster,
            summary: summary,
            score: score,
            release_date: release_date,
            extra: extra
          });
        }
    })
  ).get();
  
  return Promise.all(reviews);
};




const getTVInfoReview = async(id: string) =>{
  const res = await req(id);
  const $ = load(res);

  return new Promise(async(resolve, reject) =>{
    try{
      const info = [];
      $('body.skybox-auto-collapse div#page div#content_header_wrapper div#main_content').each((_index, element) =>{
        const $element = $(element);
        let json = JSON.parse($element.find('div.movie script').attr("type","application/ld+json").html()) || null
        if(json !== null){
          const numberOfEpisodes = json.numberOfEpisodes || null;
          const publisher = json.publisher || null;
          const genre = json.genre || null;
          const episode = json.episode || null;
         
          info.push({
            numberOfEpisodes: numberOfEpisodes,
            publisher: publisher,
            genre: genre,
            episode: episode
          });
        }else{
          json = null;
          info.push({});
        }
      });      

     
      const reviews = await getTVCriticReviews(id);
      const full_review = [{info: info, reviews: reviews}];
      
      resolve(full_review);

    }catch(err){
      reject(err)
    }
  });
}

const getMoviesInfoReview = async(id: string) =>{
  const res = await req(id);
  const $ = load(res);

  return new Promise(async(resolve, reject) =>{
    try{
      const info = [];
      $('body.skybox-auto-collapse div#page div#content_header_wrapper div#main_content').each((_index, element) =>{
        const $element = $(element);
        let json = JSON.parse($element.find('div.movie script').attr("type","application/ld+json").html()) || null
        if(json !== null){
          const aggregateRating = json.aggregateRating || null;
          const contentRating = json.contentRating || null;
          const duration = json.duration || null;
          const director = json.director || null;
          const actor = json.actor || null;
          const publisher = json.publisher || null;
          const genre = json.genre || null;
          info.push({
            aggregateRating: aggregateRating,
            contentRating: contentRating,
            duration: duration,
            actor: actor,
            publisher: publisher,
            genre: genre
          });
        }else{
          json = null;
          info.push({});
        }
      });

      const video = $('body.skybox-auto-collapse div#page div#content_header_wrapper div#main_content table.maskedauto tbody tr td.maskedcenter table tbody tr td.gu7 div.maskedcol div.video_wrapper div.video_and_autoplay div#videoContainer_wrapper').attr('data-mcvideourl');
      const trailer = {trailer: video ? video : {}}
      const reviews = await getMoviesCriticReviews(id);
      const full_review = [{info: info, videos: trailer, reviews: reviews}];
      
      resolve(full_review);

    }catch(err){
      reject(err)
    }
  });
}

const getGameInfoReview = async(id: string) =>{
  const res = await req(id);
  const $ = load(res);

  return new Promise(async(resolve, reject) =>{
    try{
      const info = [];
      $('body.skybox-auto-collapse div#site_layout div#gutters div#main').each((_index, element) =>{
        const $element = $(element);
        let json = JSON.parse($element.find('div.product_split div.left script').attr("type","application/ld+json").html()) || null
        if(json !== null){
          const contentRating = json.contentRating || null;
          const gamePlatform = json.gamePlatform || null;
          const operatingSystem = json.operatingSystem || null;
          const genre = json.genre || null;
          const publisher = json.publisher || null;
          const aggregateRating = json.aggregateRating || null;
          
          info.push({
            contentRating: contentRating,
            gamePlatform: gamePlatform,
            operatingSystem: operatingSystem,
            genre: genre,
            publisher: publisher,
            aggregateRating: aggregateRating
          })
        }else{
          json = null;
          info.push({});
        }
      });

      const scripts = $('script');
      const trailers = [];
      Array.from({length: scripts.length} , (_v , k) =>{
        const $script = $(scripts[k]);
        const contents = $script.html();
        if((contents || '').includes('MetaC.Video.addToPlaylist(')) {
          const playList = contents.split('MetaC.Video.addToPlaylist(') || null;
          if(playList !== null){
            const list = playList.toString().match(/((?:https?(?:%3A%2F%2F|:\/\/))(?:www\.)?(?:\S+)(?:%2F|\/)(?:(?!\.(?:mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg))[^\/])*\.(mp4|mkv|wmv|m4v|mov|avi|flv|webm|flac|mka|m4a|aac|ogg))(?!\/|\.[a-z]{1,3})/gim) || null;
            const videoList = {trailer: list ? list : {}}
            trailers.push(videoList)
          }
        }
      });

      const reviews = await getGamesCriticReviews(id);
      const full_review = [{info: info, videos: trailers, reviews: reviews}];

      resolve(full_review);

    }catch(err){
      reject(err)
    }
  });
}

const getTVCriticReviews = async(id: string) =>{
  const res = await req(`${id}/critic-reviews`);
  const $ = load(res);

  const reviews = $('body.skybox-auto-collapse div#site_layout div#gutters div#main ol.reviews li.review div.review_content').map((_index, element) =>
    new Promise((resolve, _reject) =>{
      try{
        const $element = $(element);
        const review_critic = $element.find('div.review_section div.review_stats div.review_critic div.source a').text() || null;
        const author = $element.find('div.review_section div.review_stats div.review_critic div.author a').text() || null;
        const review_date = $element.find('div.review_section div.review_stats div.review_critic div.date').text() || null;
        const review_grade = $element.find('div.review_section div.review_stats div.review_grade div.metascore_w').text() || null;
        const review = $element.find('div.review_section div.review_body').text().trim() || null;
        resolve({
          review: review,
          review_critic: review_critic,
          author: author,
          review_date: review_date,
          review_grade: review_grade
        });
      }catch(err){
        _reject(err)
      }
  })).get();

  return Promise.all(reviews);
};

const getMoviesCriticReviews = async(id: string) =>{
  const res = await req(`${id}/critic-reviews`);
  const $ = load(res);

  const reviews = $('body.skybox-auto-collapse div#page div#main_content div.list div.critic_reviews div.review').map((_index, element) =>
    new Promise((resolve, _reject) =>{
      try{
        const $element = $(element);
        const review_critic = $element.find('div.right div.title span.source a img.pub-img').attr('title');
        const author = $element.find('div.right div.title span.author a').text().trim();
        const review_date = $element.find('div.right div.title span.date').text() || null;
        const review_grade = $element.find('div.left div.metascore_w').text() || null;
        const review = $element.find('div.right div.summary a.no_hover').text().trim() || null;
        resolve({
          author: author,
          review_critic: review_critic,
          review_date: review_date,
          review_grade: review_grade,
          review: review,
        });
      }catch(err){
        _reject(err)
      }
  })).get();

  return Promise.all(reviews);
};

const getGamesCriticReviews = async(id: string) =>{
  const res = await req(`${id}/critic-reviews`);
  const $ = load(res);

  const reviews = $('body.skybox-auto-collapse div#site_layout div#gutters div#main ol.reviews li.review div.review_content').map((_index, element) =>
    new Promise((resolve, _reject) =>{
      try{
        const $element = $(element);
        const review_critic = $element.find('div.review_section div.review_stats div.review_critic div.source a.external').text() || null;
        const review_date = $element.find('div.review_section div.review_stats div.review_critic div.date').text() || null;
        const review_grade = $element.find('div.review_section div.review_stats div.review_grade div.metascore_w').text() || null;
        const review = $element.find('div.review_section div.review_body').text().trim() || null;
        resolve({
          review: review,
          review_critic: review_critic,
          review_date: review_date,
          review_grade: review_grade
        });
      }catch(err){
        _reject(err)
      }
  })).get();

  return  Promise.all(reviews);
};
