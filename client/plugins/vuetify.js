import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const custom = {
    dark: false,
    colors: {
        background: '#fff',
        surface: '#1e1e1e',
        primary: '#e47207',
        secondary: '#cecdc7',
        error: '#b00020',
        info: colors.lime.accent3,
        success: colors.green.accent3,
        warning: colors.amber.darken2,
    }
}
 
export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        theme: {
            defaultTheme: 'custom',
            themes: {
                custom,
            }
        }
    })

    nuxtApp.vueApp.use(vuetify)
})