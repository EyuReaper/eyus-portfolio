import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Simple from '../components/Simple.vue';

describe('Simple component', () => {
  it('renders the message', () => {
    const wrapper = mount(Simple);
    expect(wrapper.text()).toContain('Hello from Simple component');
  });
});
