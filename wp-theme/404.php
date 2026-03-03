<?php
/**
 * 404 template.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

get_header(); ?>

<section class="section section--404">
    <div class="container">
        <h1 class="text-gradient-gold">404</h1>
        <p><?php esc_html_e( 'The page you are looking for does not exist.', 'royal-devs' ); ?></p>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn--primary"><?php esc_html_e( 'Go Home', 'royal-devs' ); ?> &rarr;</a>
    </div>
</section>

<?php get_footer(); ?>
