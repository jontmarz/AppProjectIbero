// Menu
export const menuItems = [
    {
        title: "Antecedentes",
        url: "/records",
    },
    {
        title: "Árbol del Problema",
        url: "/problem-tree",
    },
    {
        title: "Descripción del Problema",
        url: "/description",
    },
    {
        title: "Justificación",
        url: "/justification",
    },
    {
        title: "Título y Objetivos",
        url: "/goals",
    },
    {
        title: "Ética e Impactos",
        url: "/ethicalimpacts",
    },
    {
        title: "Metodología",
        url: "/methodology",
    },
    {
        title: "Ficha del Proyecto",
        url: "/print-to-pdf",
    }
]

// Tipo de documento
export const typeDocSel = [
    { type: "CC", label: "Cédula de Ciudadanía"},
    { type: "TI", label: "Tarjeta de Identidad"},
    { type: "CE", label: "Cédula de Extranjería"},
]

export const roleSel = [
    { role: "Docente", label: "Docente"},
    { role: "Estudiante", label: "Estudiante"},
]

export const searchSelect = [
    { id: 1, name: "Identificación" },
    { id: 2, name: "Nombre Estudiante" },
    { id: 3, name: "Proyecto" },
]

// Estado de los proyectos
export const typeStatus = [
    { value: "Approved", label: "Aprobado", color: "#135413", colorR: "green" },
    { value: "Corrections", label: "Aprobado con correcciones", color: "#0098D4", colorR: "secondary" },
    { value: "No_Approved", label: "No aprobado", color: "#de0d0d", colorR: "redN" }
]

// Lista de items para la justificación
export const listJust = [
    "1. La necesidad de ese proyecto ¿Por qué se va a hacer?",
    "2. Finalidad del proyecto, ¿Para qué se va a hacer?",
    "3. ¿Qué problemáticas resuelve?",
    "4. Las exigencias que tiene. ¿Cómo se va a hacer?"
]

// Lista de items aprobar la justificación
export const listItemsJust = [
    "Mínimo 800 palabras",
    "Mínimo 5 citas o referentes en norma APA",
    "Buena coherencia",
    "Buena ortografía",
]

// Lista de items para la descripción
export const listItemsDescr = [
    "Citas en norma APA.",
    "Mínimo 1000 palabras.",
    "Minimo 5 citas o referentes.",
    "Buena coherencias",
    "Buena ortografía",
    "Relación coherente con el árbol del problema",
]

// tecnicas de recoleccion de datos
export const listTPickupInfo = ["Encuesta", "Observación", "Entrevista", "Revisión Bibliográfica", "Otros"]

export const listRoles = ["SuperUser", "Docente", "Estudiante"]

export const navItems = [
    /* { text: 'Features', href: '#features' },
    { text: 'FAQ', href: '#faq' },
    { text: 'Contact', href: '#contact' }, */
    { text: 'Iniciar Sesión', href: '/login', class: 'login' },
    { text: 'Registrarse', href: '/signup', class: 'signup' },
]

export const listFeatures = [
    {
        txt: "Creación y gestión de proyectos de investigación.",
        img: "iconFeature1"
    },
    {
        txt: "Seguimiento del progreso del proyecto.",
        img: "iconFeature2"
    },
    {
        txt: "Comunicación efectiva entre estudiantes y docentes.",
        img: "iconFeature3"
    },
    {
        txt: "Evaluación y retroalimentación de proyectos.",
        img: "iconFeature4"
    }
]

export const listFAQ = [
    {
        question: "¿Cómo iniciar sesión en ResearchPro?",
        answer: [
            "Ingresa a la página de ResearchPro",
            "Haz clic en el botón 'Iniciar Sesión'",
            "Ingresa tu correo electrónico institucional y contraseña",
            "Haz clic en el botón 'Iniciar Sesión'"
        ]
    },
    {
        question: "¿Cómo registrarse en ResearchPro?",
        answer: [
            "Ingresa a la página de ResearchPro",
            "Haz clic en el botón 'Registrarse'",
            "Ingresa tu correo electrónico, contraseña y los demás campos del formulario",
            "Haz clic en el botón 'Registrarse'"
        ]
    },
    {
        question: "¿Cómo crear un proyecto de investigación?",
        answer: [
            "Inicia sesión en ResearchPro",
            "Diligencia todos los formularios requeridos",
            /* "Dirígete a la sección 'Proyectos'",
            "Haz clic en el botón 'Crear Proyecto'", */
            "Completa los campos requeridos y haz clic en 'Guardar'"
        ]
    },
    /* {
        question: "¿Cómo agregar miembros a un proyecto?",
        answer: [
            "Inicia sesión en ResearchPro",
            "Dirígete a la sección 'Proyectos'",
            "Selecciona el proyecto al que deseas agregar miembros",
            "Haz clic en el botón 'Agregar Miembro'",
            "Ingresa el correo electrónico del miembro y haz clic en 'Agregar'"
        ]
    }, */
    {
        question: "¿Cómo realizar un seguimiento del progreso de mi proyecto?",
        answer: [
            "Inicia sesión en ResearchPro",
            "Dirígete al dashboard",
            "Selecciona el aspecto que deseas visualizar",
            "Haz clic en el botón 'Editar'",
        ]
    },
    {
        question: "¿Cómo obtener retroalimentación de mi proyecto?",
        answer: [
            "Inicia sesión en ResearchPro",
            "Dirígete al dashboard",
            "Revisa los comentarios del docente",
            "Realiza los cambios sugeridos y haz clic en 'Guardar'",
        ]
    }
]

export const listSocialMedia = [
    {
        name: "Facebook",
        icon: "FacebookIcon",
        url: "https://www.facebook.com/LaIberoU/"
    },
    {
        name: "X",
        icon: "XIcon",
        url: "https://twitter.com/LaIberoU_"
    },
    {
        name: "Instagram",
        icon: "InstagramIcon",
        url: "https://www.instagram.com/laiberou/"
    },
    {
        name: "YouTube",
        icon: "YouTubeIcon",
        url: "https://www.youtube.com/channel/UC68bjC1Ed6ei66zyCICalJA"
    }
]