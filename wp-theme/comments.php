<?php
/**
 * Comments template.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if ( have_comments() ) : ?>
        <h3 class="comments-title">
            <?php
            printf(
                esc_html( _n( '%d Comment', '%d Comments', get_comments_number(), 'royal-devs' ) ),
                get_comments_number()
            );
            ?>
        </h3>

        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'      => 'ol',
                'short_ping' => true,
            ) );
            ?>
        </ol>

        <?php the_comments_navigation(); ?>
    <?php endif; ?>

    <?php comment_form(); ?>
</div>
