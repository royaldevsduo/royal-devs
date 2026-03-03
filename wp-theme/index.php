<?php
/**
 * The main template file.
 *
 * @package RoyalDevs
 * @since 1.0.0
 */

get_header(); ?>

<section class="section section--posts">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
                    <?php if ( has_post_thumbnail() ) : ?>
                        <div class="post-card__image">
                            <?php the_post_thumbnail( 'medium_large' ); ?>
                        </div>
                    <?php endif; ?>

                    <div class="post-card__content">
                        <h2 class="post-card__title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="post-card__excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                    </div>
                </article>
            <?php endwhile; ?>

            <div class="pagination">
                <?php the_posts_pagination(); ?>
            </div>
        <?php else : ?>
            <p><?php esc_html_e( 'No posts found.', 'royal-devs' ); ?></p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
