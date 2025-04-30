import gulp from 'gulp';
import { exec } from 'child_process';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify'; // Para minificar JS
import concat from 'gulp-concat'; // Para concatenar archivos JS

// Usar `sass` como el compilador para `gulp-sass`
import * as sassCompiler from 'sass';
const gulpSass = sass(sassCompiler);

// Iniciar servidor PHP
gulp.task('php-server', (done) => {
  const server = exec('php -S localhost:3000', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });

  // Asegurarnos de que la URL se imprima correctamente
  server.stdout.on('data', (data) => {
    if (data.includes('PHP') && data.includes('Development Server started')) {
      console.log('Server is running at: http://localhost:3000');
    }
  });

  done(); // Termina la tarea
});

// Tarea para procesar JavaScript
gulp.task('js', () => {
  return gulp.src([
    'src/js/*.js'           // Si tienes otros JS que quieres concatenar
  ])
  .pipe(concat('bundle.js'))  // Concatenar todos los archivos JS en uno
  .pipe(uglify())             // Minificar el archivo JS
  .pipe(gulp.dest('dist/js'));  // Carpeta de salida para los JS procesados
});

// Tarea para compilar Sass y recargar el navegador
gulp.task('styles', () => {
  return gulp.src('src/scss/index.scss')
    .pipe(gulpSass().on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // ✅ Esto es correcto para inyectar CSS sin recargar
});


// Tarea para copiar imágenes
gulp.task('images', () => {
  return gulp.src('src/img/**/*') // Selecciona todas las imágenes en src/img
    .pipe(gulp.dest('dist/img')); // Las copia a dist/img
});


// Iniciar BrowserSync
gulp.task('serve', gulp.series('php-server', () => {
  browserSync.init({
    proxy: "localhost:3000", // usa el proxy si usas PHP
    open: true,
    notify: true, // muestra un banner cuando recarga
    port: 3000,
    ui: { port: 3001 }
  });

  // Vigilar archivos Sass, JS, PHP y HTML
  gulp.watch('src/scss/**/*.scss', gulp.series('styles'));  // Procesa y recarga CSS
  gulp.watch('src/js/**/*.js', gulp.series('js', browserSync.reload));  // Procesa JS y recarga la página
  gulp.watch('**/*.php').on('change', browserSync.reload);// Recarga la página cuando haya cambios en PHP
  gulp.watch('*.html').on('change', browserSync.reload);   // Recarga la página cuando haya cambios en HTML
}));


// Tarea 'dev' para ejecutar todo
gulp.task('dev', gulp.series('styles', 'js', 'serve', 'images'));

// Tarea por defecto
gulp.task('default', gulp.series('dev'));
