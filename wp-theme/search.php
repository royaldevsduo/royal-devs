<?php
/**
 * Search results template.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

get_header(); ?>

<section class="section">
    <div class="container">
        <div class="archive__header">
            <h1 class="archive__title text-gradient-gold">
                <?php printf( esc_html__( 'Search Results for: %s', 'royal-devs' ), get_search_query() ); ?>
            </h1>
        </div>

        <div class="site-layout--with-sidebar">
            <div class="posts-list">
                <?php if ( have_posts() ) : ?>
                    <?php while ( have_posts() ) : the_post(); ?>
                        <article <?php post_class( 'post-card' ); ?>>
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="post-card__image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail( 'medium_large' ); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <div class="post-card__content">
                                <h2 class="post-card__title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>
                                <div class="post-card__excerpt">
                                    <?php echo wp_trim_words( get_the_excerpt(), 25 ); ?>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>

                    <div class="pagination">
                        <?php the_posts_pagination(); ?>
                    </div>
                <?php else : ?>
                    <p style="color:var(--color-muted-fg);"><?php esc_html_e( 'No results found. Try a different search.', 'royal-devs' ); ?></p>
                <?php endif; ?>
            </div>

            <?php get_sidebar(); ?>
        </div>
    </div>
</section>

<?php get_footer(); ?>
