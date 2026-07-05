import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import DashboardView from '../DashboardView.vue'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    user: {
      value: {
        sub: 'auth0|123',
        name: 'Viona',
        email: 'viona@test.de',
      },
    },
    isLoading: {
      value: false,
    },
    isAuthenticated: {
      value: true,
    },
  }),
}))

vi.mock('@/components/Sidebar.vue', () => ({
  default: {
    template: '<aside>Sidebar</aside>',
  },
}))

describe('DashboardView', () => {
  beforeEach(() => {
    pushMock.mockClear()

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string, options?: RequestInit) => {
        if (url.includes('/users')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({}),
          })
        }

        if (url.includes('/shoppinglist/user/')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve([
                {
                  id: 1,
                  name: 'REWE',
                  category: 'Lebensmittel',
                  emoji: '🛒',
                },
                {
                  id: 2,
                  name: 'EDEKA',
                  category: 'Lebensmittel',
                  emoji: '🛒',
                },
                {
                  id: 3,
                  name: 'Uni Bücher',
                  category: 'Bücher',
                  emoji: '📚',
                },
              ]),
          })
        }

        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        })
      }),
    )
  })
  

  it('zeigt die Überschrift Kategorisierte Listen an', async () => {
    const wrapper = shallowMount(DashboardView)
    await flushPromises()

    expect(wrapper.text()).toContain('Kategorisierte Listen')
  })

  it('zeigt geladene Kategorien an', async () => {
    const wrapper = shallowMount(DashboardView)
    await flushPromises()

    expect(wrapper.text()).toContain('Lebensmittel')
    expect(wrapper.text()).toContain('Bücher')
  })

  it('zeigt den Button Neue Kategorie an', async () => {
    const wrapper = shallowMount(DashboardView)
    await flushPromises()

    expect(wrapper.text()).toContain('Neue Kategorie')
  })
})
