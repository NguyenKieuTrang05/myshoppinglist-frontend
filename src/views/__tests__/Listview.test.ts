import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import ListView from '../ListView.vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {
      categoryName: 'Lebensmittel',
      listName: '1',
    },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/components/Sidebar.vue', () => ({
  default: {
    template: '<aside>Sidebar</aside>',
  },
}))

describe('ListView', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/shoppinglist/1/items')) {
          return Promise.resolve({
            json: () =>
              Promise.resolve([
                {
                  id: 1,
                  name: 'Milch',
                  category: 'Kühlware',
                  amount: '1L',
                  price: 1.5,
                  priority: 'Hoch',
                  status: 'Offen',
                  purchased: false,
                  url: '',
                },
                {
                  id: 2,
                  name: 'Brot',
                  category: 'Backwaren',
                  amount: '1',
                  price: 2.5,
                  priority: 'Niedrig',
                  status: 'Gekauft',
                  purchased: true,
                  url: '',
                },
              ]),
          })
        }

        return Promise.resolve({
          json: () =>
            Promise.resolve({
              id: 1,
              name: 'Wocheneinkauf',
              category: 'Lebensmittel',
              emoji: null,
            }),
        })
      }),
    )
  })

  it('zeigt geladene Produkte an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Wocheneinkauf')
    expect(wrapper.text()).toContain('Milch')
    expect(wrapper.text()).toContain('Brot')
  })

  it('filtert Produkte über die Suche', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    await wrapper.find('.search-bar').setValue('Milch')

    expect(wrapper.text()).toContain('Milch')
    expect(wrapper.text()).not.toContain('Brot')
  })
  it('zeigt den Namen der Einkaufsliste an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Wocheneinkauf')
  })

  it('zeigt den Button Produkt hinzufügen an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Produkt hinzufügen')
  })

  it('zeigt den Button Liste löschen an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Liste löschen')
  })

  it('zeigt die Suchleiste an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.find('.search-bar').exists()).toBe(true)
  })
  it('zeigt die Filter-Tabs an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Alle Artikel')
    expect(wrapper.text()).toContain('Nach Kategorie')
    expect(wrapper.text()).toContain('Zu kaufen')
    expect(wrapper.text()).toContain('Priorität')
  })

  it('zeigt Produktkategorien an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Kühlware')
    expect(wrapper.text()).toContain('Backwaren')
  })

  it('zeigt Produktpreise an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('1.5 €')
    expect(wrapper.text()).toContain('2.5 €')
  })

  it('zeigt Produktstatus an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    expect(wrapper.text()).toContain('Offen')
    expect(wrapper.text()).toContain('Gekauft')
  })

  it('zeigt nach dem Leeren der Suche wieder alle Produkte an', async () => {
    const wrapper = shallowMount(ListView)
    await flushPromises()

    await wrapper.find('.search-bar').setValue('Milch')
    await wrapper.find('.search-bar').setValue('')

    expect(wrapper.text()).toContain('Milch')
    expect(wrapper.text()).toContain('Brot')
  })
})
