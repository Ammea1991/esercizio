// import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'
import Loading from '@/components/Loading.vue'
import { shallowMount, createLocalVue, RouterLinkStub, mount } from '@vue/test-utils';


import helpers from '~/utils/GeneralHelpers'

export const addVuetify = (context) => {
    context.vuetify = require('vuetify')
    context.vue.use(context.vuetify)
    // eslint-disable-next-line new-cap
    context.vuetifyInstance = new context.vuetify()
}

export const addVuex = (context) => {
    context.vuex = require('vuex')
    context.vue.use(context.vuex)
}

export const addHelpers = () => {
    return (context) => {
        context.vue.prototype.$helpers = helpers
    }
}

export const addI18n = (options) => {
    return (context) => {
        context.i18n = require('vue-i18n')
        context.vue.use(context.i18n)
        // eslint-disable-next-line new-cap
        context.i18nInstance = new context.i18n(options)
    }
}

export const addFilter = (name, lambda) => {
    return context => context.vue.filter(name, lambda)
}

export const compositeConfiguration = (...configs) => {
    return context => configs.forEach(config => config(context))
}

export const bootstrapVueContext = (configureContext) => {
    const context = {}
    const teardownVueContext = () => {
        jest.unmock('vue')
        Object.keys(context).forEach(key => delete context[key])
        jest.resetModules()
    }

    jest.isolateModules(() => {
        context.vueTestUtils = require('@vue/test-utils')
        context.vue = context.vueTestUtils.createLocalVue()

        jest.doMock('vue', () => context.vue)

        configureContext && configureContext(context)
    })

    return {
        teardownVueContext,
        ...context
    }
}

describe('Testing some ocmponents', () => {
    let vueContext = null

    beforeEach(() => {
        vueContext = bootstrapVueContext(
            compositeConfiguration(addVuex, addVuetify, addHelpers())
        )
    })

    afterEach(() => {
        vueContext.teardownVueContext()
    })

    test('Test Login Component', () => {
        const wrapper = vueContext.vueTestUtils.mount(Login, {
            localVue: vueContext.vue,
            vuetify: vueContext.vuetifyInstance,
            stubs: {
                NuxtLink: RouterLinkStub
            }
        })

        //expect(wrapper.text()).toMatch('Logo')
        expect(wrapper.vm).toBeTruthy()
    })


    test('Test Loading Component', () => {
        const wrapper = vueContext.vueTestUtils.mount(Loading, {
            localVue: vueContext.vue,
            vuetify: vueContext.vuetifyInstance,
            stubs: {
                NuxtLink: RouterLinkStub
            }
        })

        //expect(wrapper.text()).toMatch('Logo')
        expect(wrapper.vm).toBeTruthy()
    })
})