import { error } from '@sveltejs/kit';

export function load() {
    throw error(404, 'page not found');
}
