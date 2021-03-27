module.exports = {
   purge: ['./pages/**/*.js', './components/**/*.js'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      fontFamily : {
         sans : ['Rubik', 'sans-serif'],
      },
      extend: {
         backgroundColor: {
            primary: "var(--color-bg-primary)",
            secondary: "var(--color-bg-secondary)",
            red : "#BF616A",
            yellow : "#EBCB8B",
            green : '#A3BE8C',
            blue :'#88C0D0',
            dark : '#2E3440',
         },
         textColor: {
            accent: "var(--color-text-accent)",
            primary: "var(--color-text-primary)",
            secondary: "var(--color-text-secondary)",
            gray1: "var(--color-text-gray1)",
            gray2: "var(--color-text-gray2)",
            red : "#BF616A",
            yellow : "#EBCB8B",
            green : '#A3BE8C',
            blue :'#88C0D0',
            dark : '#2E3440',
         },
      },
      variants: {
         extend: {},
      },
      plugins: [],
   }
}
