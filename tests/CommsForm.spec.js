import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, h, Suspense } from 'vue';
import Index from '../pages/index.vue';

function withSuspense(component) {
  return defineComponent({
    inheritAttrs: false,
    setup() {
      return () => h(Suspense, null, {
        default: () => h(component),
        fallback: () => h('div', 'Loading...'),
      });
    },
  });
}

async function mountIndex() {
  const wrapper = mount(withSuspense(Index));
  await flushPromises();
  return wrapper;
}

describe('CommsForm', () => {
  it('renders the form', async () => {
    const wrapper = await mountIndex();
    expect(wrapper.find('#comms').exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('shows validation errors for empty fields', async () => {
    const wrapper = await mountIndex();
    await wrapper.find('form').trigger('submit.prevent');
    
    expect(wrapper.html()).toContain('Name is required.');
    expect(wrapper.html()).toContain('Email is required.');
    expect(wrapper.html()).toContain('Message is required.');
  });

  it('shows validation error for invalid email', async () => {
    const wrapper = await mountIndex();
    await wrapper.find('input#name').setValue('Test Name');
    await wrapper.find('input#email').setValue('invalid-email');
    await wrapper.find('textarea#message').setValue('Test Message');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.html()).toContain('Please enter a valid email address.');
  });

  it('submits the form successfully with valid data', async () => {
    global.fetch = vi.fn((url) => {
      if (url === 'https://api.web3forms.com/submit') {
        return Promise.resolve({
          json: () => Promise.resolve({ success: true }),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });

    const wrapper = await mountIndex();
    await wrapper.find('input#name').setValue('Test Name');
    await wrapper.find('input#email').setValue('test@example.com');
    await wrapper.find('textarea#message').setValue('Test Message');
    await wrapper.find('form').trigger('submit.prevent');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    const submitCall = global.fetch.mock.calls.find(
      ([url]) => url === 'https://api.web3forms.com/submit',
    );
    expect(submitCall).toBeDefined();
    const [, options] = submitCall;
    expect(options).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(JSON.parse(options.body)).toMatchObject({
      access_key: expect.any(String),
      name: 'Test Name',
      email: 'test@example.com',
      message: 'Test Message',
    });

    expect(wrapper.html()).toContain('Message sent successfully!');
  });

  it('handles form submission failure', async () => {
    global.fetch = vi.fn((url) => {
      if (url === 'https://api.web3forms.com/submit') {
        return Promise.reject('API is down');
      }
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });

    const wrapper = await mountIndex();
    await wrapper.find('input#name').setValue('Test Name');
    await wrapper.find('input#email').setValue('test@example.com');
    await wrapper.find('textarea#message').setValue('Test Message');
    await wrapper.find('form').trigger('submit.prevent');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain('Failed to send message. Please try again.');
  });
});
