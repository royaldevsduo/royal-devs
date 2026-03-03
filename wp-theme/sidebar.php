<?php
/**
 * Sidebar template.
 *
 * @package RoyalDevs
 * @since 1.1.0
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>

<aside class="sidebar" role="complementary">
    <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside>
