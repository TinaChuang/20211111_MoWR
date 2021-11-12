// gulpfile.js
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css'); // gulp-minify-css Author message:Please use gulp-clean-css
const babel = require('gulp-babel');
const del = require('del');

// 設定變動性的路徑位置
var config = {
  
  dist: "dist",
  tempTarget: { //開發環境路徑
    Frontend: "D:/20211111_MoWR/view",
    Backend: "D:/eqc-backend/wwwroot"
  }, 
  temp: "temp/", //project Themes folder
  sourceTarget:{
    Frontend: "./",
    Backend: "Backend/"
  },
  source:{
    scss: "scss",
    js: "script"
  },
  scss: "scss",
  js: "script"
};

function checkDevEnv(obj){
  var envTemp = config.tempTarget,
  envSource = config.sourceTarget,
  argument = obj.indexOf("--env");

  if(argument > -1){
    var name = obj[argument + 1];
    switch(name){
      case "Frontend":
        config.source.scss = envSource.Frontend + "scss";
        config.source.js = envSource.Frontend + "script";
        config.temp = envTemp.Frontend;
        break;
      case "Backend":
        config.source.scss = envSource.Backend + "scss";
        config.source.js = envSource.Backend + "script";
        config.temp = envTemp.Backend;
        break;
      default:
        config.source.scss = config.scss;
        config.source.js = config.js;
        config.temp = config.temp;
      break;
    }
  }
  console.log("來源碼: ", config.source.scss, ';', config.source.js, "編譯暫存: ", config.temp);
  console.log("[(很重要)你的開發環境]:" + config.temp);
}


// 正式壓縮版 CSS
gulp.task('dist:css', ()=>{
  checkDevEnv(process.argv);
  return gulp.src(config.source.scss + '/{*,*/}*.scss')
              .pipe(sass({
                precision: 10,
                errLogToConsole: true
              }).on('error', sass.logError))
              .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
              .pipe(cleanCSS({debug: true}, (details)=>{
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log(`${details.name}: ${details.stats.minifiedSize}`);
              })) // css 壓縮 & 移除註解
              .pipe(gulp.dest(config.dist + '/css'))
})

// 正式壓縮版 JS
gulp.task('dist:uglify', function(){
  checkDevEnv(process.argv);
  return gulp.src(config.source.js + '/{*,*/}*.js')
              .pipe(babel({
                presets: ['@babel/env']
              }))
              .pipe(uglify())
              .pipe(gulp.dest(config.dist + '/Scripts'));
});

// 開發版CSS
gulp.task('sass', ()=>{
  return gulp.src(config.source.scss + '/{*,*/}*.scss') // '/{*,*/}*.scss'  // /*.scss
              .pipe(sass({
                outputStyle: 'expanded',
                precision: 10,
                errLogToConsole: true
              }).on('error', sass.logError))
              .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
              .pipe(gulp.dest(config.temp + '/css'))
})

// 開發版JS
gulp.task('script', ()=>{
  return gulp.src(config.source.js + '/{*,*/}*.js')
              .pipe(babel({
                presets: ['@babel/env']
              }))
              .pipe(gulp.dest(config.temp + '/js'));
})

// 複製一份JS從開發資料夾到編譯後資料夾
gulp.task('copy', ()=>{
  return gulp.src([
    config.source.js + '/{*,*/}*.js'
  ])
  .pipe(gulp.dest(config.temp + '/js'));
});

//clean task
gulp.task('clean', (done)=>{
  return del(['temp', 'dist'], {force: true, read: false}, done);
})


gulp.task('server', ()=>{
  checkDevEnv(process.argv);

  return gulp.watch([
          config.source.js + '/{*,*/}*.js',
          config.source.scss + '/{*,*/,*/*/,*/*/*/}*.scss'
        ], gulp.parallel('sass', 'copy'));
});

gulp.task('watchJS', ()=>{
  return gulp.watch([
          config.source.js + '/{*,*/}*.js'
        ], gulp.parallel('copy'));
});

gulp.task('build', gulp.series('dist:uglify', 'dist:css'));

/*
  gulp.task('default', async()=>{
    await console.log('Hello World!');
  });
*/

/*
  gulp.task('testGulp', done => {
    console.log('Hello World!');
    done();
  });
*/
