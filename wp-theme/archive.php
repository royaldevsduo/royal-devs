<?php
/**
 * Archive template — categories, tags, dates.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

get_header(); ?>

<section class="section">
    <div class="container">
        <div class="archive__header">
            <?php the_archive_title( '<h1 class="archive__title text-gradient-gold">', '</h1>' ); ?>
            <?php the_archive_description( '<p class="archive__description">', '</p>' ); ?>
        </div>

        <div class="site-layout--with-sidebar">
            <div class="posts-list">
                <?php if ( have_posts() ) : ?>
                    <?php while ( have_posts() ) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="post-card__image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail( 'medium_large' ); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <div class="post-card__content">
                                <div class="post-card__meta">
                                    <span><?php echo get_the_date(); ?></span>
                                </div>
                                <h2 class="post-card__title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                <div class="post-card__excerpt">
                                    <?php echo wp_trim_words( get_the_excerpt(), 25 ); ?>
                                </div>
                                <a href="<?php the_permalink(); ?>" class="post-card__read-more"><?php esc_html_e( 'Read More →', 'royal-devs' ); ?></a>
                            </div>
                        </article>
                    <?php endwhile; ?>

                    <div class="pagination">
                        <?php the_posts_pagination( array(
                            'mid_size'  => 2,
                            'prev_text' => '&larr;',
                            'next_text' => '&rarr;',
                        ) ); ?>
                    </div>
                <?php else : ?>
                    <p style="color:var(--color-muted-fg);"><?php esc_html_e( 'No posts found.', 'royal-devs' ); ?></p>
                <?php endif; ?>
            </div>

            <?php get_sidebar(); ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
