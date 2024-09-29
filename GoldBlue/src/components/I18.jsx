import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Footer translations
      copyright: "Copyright ©",
      aboutUs: "About Gold Blue",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      followUs: "Follow us on",
      allRightsReserved: "All rights reserved",
      // Landing Page translations
      welcome: "Welcome to Gold Blue",
      welcomeMessage: "Gold Blue, a leading gold trading company, offers this portal to simplify payment and withdrawal processes for our clients.",
      theiaImageAlt: "Gold Blue Payment and Withdrawal Portal",
      aboutTitle: "About Gold Blue",
      aboutMessage: "Gold Blue is a trusted company specializing in gold trading. This website serves as a secure portal designed to help clients with easy payment and withdrawal management, ensuring their transactions are handled efficiently.",
      companionTitle: "Seamless payment and withdrawal solutions",
      companionMessage: "Our portal allows Gold Blue clients to make secure payments and withdraw funds effortlessly, backed by robust security measures to protect financial transactions.",
      
      // Image Descriptions (Unique Explanations)
      row1Explanation: "Gold Blue ensures fast and reliable payments, allowing you to manage your gold trades without interruptions. This efficiency means your funds are processed quickly and reliably every time.",
      row2Explanation: "Our user-friendly interface simplifies the payment process, providing clear steps for every transaction. Even first-time users can navigate through their payments and withdrawals with ease.",
      row3Explanation: "Security is a top priority at Gold Blue. Our advanced encryption and fraud prevention systems protect all financial data, ensuring your transactions are safe from start to finish.",
      row4Explanation: "Track all of your payments and withdrawals in one place with our comprehensive dashboard. Stay informed about your financial activity, making it easier to manage your trades and funds.",

      // Navigation translations
      about: "About",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
    },
  },
  fr: {
    translation: {
      // Footer translations
      copyright: "Droit d'auteur ©",
      aboutUs: "À propos de Gold Blue",
      contactUs: "Contactez-nous",
      privacyPolicy: "Politique de confidentialité",
      termsOfService: "Conditions d'utilisation",
      followUs: "Suivez-nous sur",
      allRightsReserved: "Tous droits réservés",
      // Landing Page translations
      welcome: "Bienvenue chez Gold Blue",
      welcomeMessage: "Gold Blue, une entreprise leader dans le commerce de l'or, propose ce portail pour simplifier les processus de paiement et de retrait pour nos clients.",
      theiaImageAlt: "Portail de paiement et de retrait Gold Blue",
      aboutTitle: "À propos de Gold Blue",
      aboutMessage: "Gold Blue est une entreprise de confiance spécialisée dans le commerce de l'or. Ce site Web sert de portail sécurisé conçu pour aider les clients à gérer facilement leurs paiements et retraits, garantissant que leurs transactions sont traitées efficacement.",
      companionTitle: "Solutions de paiement et de retrait fluides",
      companionMessage: "Notre portail permet aux clients de Gold Blue d'effectuer des paiements sécurisés et de retirer des fonds sans effort, soutenus par des mesures de sécurité robustes pour protéger les transactions financières.",

      // Image Descriptions (Unique Explanations)
      row1Explanation: "Gold Blue assure des paiements rapides et fiables, vous permettant de gérer vos transactions sans interruption. L'efficacité garantit un traitement rapide et fiable de vos fonds à chaque fois.",
      row2Explanation: "Notre interface conviviale simplifie le processus de paiement, offrant des étapes claires pour chaque transaction. Même les nouveaux utilisateurs peuvent facilement naviguer dans leurs paiements et retraits.",
      row3Explanation: "La sécurité est une priorité absolue chez Gold Blue. Nos systèmes avancés de cryptage et de prévention de la fraude protègent toutes vos données financières, garantissant la sécurité de vos transactions du début à la fin.",
      row4Explanation: "Suivez tous vos paiements et retraits en un seul endroit grâce à notre tableau de bord complet. Restez informé de votre activité financière et gérez plus facilement vos transactions et fonds.",

      // Navigation translations
      about: "À propos",
      contact: "Contactez-nous",
      login: "Connexion",
      signUp: "S'inscrire",
    },
  },
  es: {
    translation: {
      // Footer translations
      copyright: "Derechos de autor ©",
      aboutUs: "Sobre Gold Blue",
      contactUs: "Contáctenos",
      privacyPolicy: "Política de privacidad",
      termsOfService: "Términos de servicio",
      followUs: "Síguenos en",
      allRightsReserved: "Todos los derechos reservados",
      // Landing Page translations
      welcome: "Bienvenido a Gold Blue",
      welcomeMessage: "Gold Blue, una empresa líder en el comercio de oro, ofrece este portal para simplificar los procesos de pago y retiro para nuestros clientes.",
      theiaImageAlt: "Portal de pagos y retiros de Gold Blue",
      aboutTitle: "Sobre Gold Blue",
      aboutMessage: "Gold Blue es una empresa de confianza especializada en el comercio de oro. Este sitio web sirve como un portal seguro diseñado para ayudar a los clientes a gestionar fácilmente sus pagos y retiros, garantizando que sus transacciones se procesen de manera eficiente.",
      companionTitle: "Soluciones fluidas de pagos y retiros",
      companionMessage: "Nuestro portal permite a los clientes de Gold Blue realizar pagos seguros y retirar fondos sin esfuerzo, respaldados por sólidas medidas de seguridad para proteger las transacciones financieras.",

      // Image Descriptions (Unique Explanations)
      row1Explanation: "Gold Blue asegura pagos rápidos y confiables, lo que le permite administrar sus transacciones sin interrupciones. La eficiencia garantiza que sus fondos se procesen de manera rápida y confiable.",
      row2Explanation: "Nuestra interfaz fácil de usar simplifica el proceso de pago, brindando pasos claros para cada transacción. Incluso los nuevos usuarios pueden navegar fácilmente por sus pagos y retiros.",
      row3Explanation: "La seguridad es una prioridad principal en Gold Blue. Nuestros sistemas avanzados de encriptación y prevención de fraudes protegen sus datos financieros, garantizando la seguridad de sus transacciones.",
      row4Explanation: "Haga un seguimiento de todos sus pagos y retiros en un solo lugar con nuestro tablero de control completo. Manténgase informado sobre su actividad financiera y gestione más fácilmente sus fondos y transacciones.",

      // Navigation translations
      about: "Sobre",
      contact: "Contacto",
      login: "Iniciar sesión",
      signUp: "Registrarse",
    },
  },
  ar: {
    translation: {
      // Footer translations
      copyright: "حقوق النشر ©",
      aboutUs: "حول جولد بلو",
      contactUs: "اتصل بنا",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة",
      followUs: "تابعنا على",
      allRightsReserved: "جميع الحقوق محفوظة",
      // Landing Page translations
      welcome: "مرحبًا بك في جولد بلو",
      welcomeMessage: "جولد بلو، شركة رائدة في تجارة الذهب، تقدم هذا الموقع لتبسيط عمليات الدفع والسحب لعملائنا.",
      theiaImageAlt: "بوابة الدفع والسحب جولد بلو",
      aboutTitle: "حول جولد بلو",
      aboutMessage: "جولد بلو هي شركة موثوقة متخصصة في تجارة الذهب. هذا الموقع يعمل كمنصة آمنة تهدف إلى مساعدة العملاء في إدارة المدفوعات والسحوبات بسهولة، مما يضمن معالجة معاملاتهم بكفاءة.",
      companionTitle: "حلول سلسة للدفع والسحب",
      companionMessage: "تتيح منصتنا لعملاء جولد بلو إجراء المدفوعات وسحب الأموال بسهولة، بدعم من تدابير أمان قوية لحماية المعاملات المالية.",

      // Image Descriptions (Unique Explanations)
      row1Explanation: "يضمن جولد بلو عمليات دفع سريعة وموثوقة، مما يسمح لك بإدارة معاملاتك دون انقطاع. تضمن الكفاءة معالجة أموالك بسرعة وموثوقية في كل مرة.",
      row2Explanation: "تسهل واجهتنا سهلة الاستخدام عملية الدفع من خلال تقديم خطوات واضحة لكل معاملة. حتى المستخدمين الجدد يمكنهم التنقل بسهولة في مدفوعاتهم وسحوباتهم.",
      row3Explanation: "الأمان هو أولوية قصوى في جولد بلو. أنظمتنا المتقدمة للتشفير ومنع الاحتيال تحمي جميع بياناتك المالية، مما يضمن أمان معاملاتك من البداية إلى النهاية.",
      row4Explanation: "تتبع جميع مدفوعاتك وسحوباتك في مكان واحد باستخدام لوحة المعلومات الشاملة الخاصة بنا. ابقَ على اطلاع على نشاطك المالي واجعل إدارة معاملاتك وأموالك أسهل.",

      // Navigation translations
      about: "حول",
      contact: "اتصل بنا",
      login: "تسجيل الدخول",
      signUp: "إنشاء حساب",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
