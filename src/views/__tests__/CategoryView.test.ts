import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import CategoryView from '../CategoryView.vue'

const pushMock = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      categoryName: 'Lebensmittel',
    },
  }),
  useRouter: () => ({
    push: pushMock,
  }),
}))

vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    user: {
      value: {
        sub: 'auth0|123',
        email: 'viona@test.de',
        name: 'Viona',
      },
    },
  }),
}))

vi.mock('@/components/Sidebar.vue', () => ({
  default: {
    template: '<aside>Sidebar</aside>',
  },
}))

describe('CategoryView', () => {
  beforeEach(() => {
    pushMock.mockClear()

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/shoppinglist/user/')) {
          return Promise.resolve({
            json: () =>
              Promise.resolve([
                {
                  id: 1,
                  name: 'REWE',
                  category: 'Lebensmittel',
                  emoji: '🛒',
                  favorite: false,
                },
                {
                  id: 2,
                  name: 'EDEKA',
                  category: 'Lebensmittel',
                  emoji: '🛒',
                  favorite: true,
                },
                {
                  id: 3,
                  name: 'Uni Bücher',
                  category: 'Bücher',
                  emoji: '📚',
                  favorite: false,
                },
              ]),
          })
        }

        if (url.includes('/shoppinglist/1/items')) {
          return Promise.resolve({
            json: () => Promise.resolve([{ id: 1 }, { id: 2 }]),
          })
        }

        if (url.includes('/shoppinglist/2/items')) {
          return Promise.resolve({
            json: () => Promise.resolve([{ id: 1 }]),
          })
        }

        return Promise.resolve({
          json: () => Promise.resolve([]),
        })
      }),
    )
  })

  it('zeigt den Kategorienamen an', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    expect(wrapper.text()).toContain('Lebensmittel')
  })

  it('zeigt Listen aus der Kategorie an', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    expect(wrapper.text()).toContain('REWE')
    expect(wrapper.text()).toContain('EDEKA')
  })

  it('zeigt keine Listen aus anderen Kategorien an', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    expect(wrapper.text()).not.toContain('Uni Bücher')
  })

  it('zeigt genau zwei Listenkarten für die Kategorie an', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    expect(wrapper.findAll('.card:not(.create-card)')).toHaveLength(2)
  })

  it('zeigt den Button Neue Liste an', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    expect(wrapper.text()).toContain('Neue Liste')
  })

  it('öffnet eine Liste beim Klick', async () => {
    const wrapper = shallowMount(CategoryView)
    await flushPromises()

    const cards = wrapper.findAll('.card')
    expect(cards[1]).toBeTruthy()
    await cards[1]!.trigger('click')

    expect(pushMock).toHaveBeenCalledWith('/list/Lebensmittel/1')
  })
})
