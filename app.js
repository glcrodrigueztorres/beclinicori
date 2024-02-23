const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MySQLAdapter = require('@bot-whatsapp/database/mysql')
const MockAdapter = require('@bot-whatsapp/database/mock')
/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = '172.31.5.217'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = 'Guille1992'
const MYSQL_DB_NAME = 'Beclinic'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowOtro = addKeyword(['8', 'contacto', 'especialista', 'consultar'])
    .addAnswer(['¡Estamos aquí para ayudarte! ¿En qué específicamente deseas información?'],
    {
        media: 'Contactanos.mp4'
    }
    );

const flowsolarium = addKeyword(['7', 'Solárium de Colágeno', 'solarium', 'colágeno'])
    .addAnswer(['El Solárium de Colágeno es un tratamiento que broncea y  estimula la producción de colágeno en tu piel dándole un aspecto radiante y dorado.',
    'Para obtener más información o agendar una sesión, comunícate con la sucursal de Los Dominicos al +56 9 7296 6753.'],
    {
        media: 'solarium.jpeg'
   }
    );

const flowDepilacionLaser = addKeyword(['6', 'Depilación láser', 'vello'])
    .addAnswer(['Depilación Láser La depilación láser es el tratamiento ideal para eliminar esos vellos en forma definitiva, puede ser en todas las partes del cuerpo donde se quiera eliminar los vellos y mantener una piel suave, el Láser de Beclinic es spirit 918 más eficaz del mercado por ser de barrido y punta congelada y de diodo que lo hace indoloro y más efectivo en su tratamiento. Sesiones recomendadas (6s)'
    ],
    {
        media: 'laser.jpeg'
    }
    );

const flowTratamientosFaciales = addKeyword(['5', 'Tratamientos faciales', 'rostro'])
    .addAnswer(['Limpieza facial, oxígenoterapia, radiofrecuencia y peeling.'
    ],
    {
        media: 'facial.jpeg'
    }
    );
    
const flowMEP = addKeyword(['4', 'MEP', 'estrías', 'Tratamiento para estrías'])
    .addAnswer(['Antiestria MEP: La corriente galvánica estimula el colágeno haciendo  que se formen otra vez las fibras de colageno de manera ordenada y con más resistencia, mejorando la textura y color de la piel.',
        'Agendar evaluación para determinar tratamiento.'
    ],
    {
        media: 'MEP.jpeg'
    }
    );

const flowVelashape = addKeyword(['3', 'Velashape', 'celulitis'])
    .addAnswer(['Velashape Elimina la celulitis, mejora la textura, reduce la grasa localizada y modela tú cuerpo, entregando una piel más firme, joven y tonificada, es una combinación de  tres tecnologías como son la radiofrecuencia, estimulando el colágeno de la zona tratada, láser infrarrojo calienta las capas más profundas de la piel y  Vacumterapia favorece la circulación sanguínea y el drenaje linfático., sesiones recomendadas de (8 a 10s).'
    ],
    {
        media: 'velashape.jpeg'
    }
    );

const flowCriolipolisis = addKeyword(['2', 'Criolipólisis', 'grasa localizada'])
    .addAnswer(['UMS Sculptor Aumenta la masa muscular y reduce la grasa, rompiendo el defecto de"la perdida de grasa". Puede actuar sobre músculos profundos que no se alcanzan durante un ejercicio normal. Es indoloro no invasivo, no tiene espacio de inactividad durante el tratamiento. Mejor que tomar cualquier medicamento reductivo que puede ocasionar erosiones y secuelas. Reduce la grasa corporal, aumenta el volumen y densidad de los músculos.'],
    {
        media: 'sculptor.jpeg'
    }
    );

const flowAgendarEvaluacion = addKeyword(['1', 'Agendar evaluación', 'evaluación', 'Agendar'])
    .addAnswer(['¿Prefieres en la mañana o en la tarde?']);

const flowPrincipal = addKeyword(['menu', 'Menu', 'MENU', 'opciones', 'Categorias', 'tratamientos', 'hola', 'Hola'])
    .addAnswer(['👨‍⚕️💖 ¡Bienvenido a Beclinic! Descubre nuestras opciones de tratamiento.'],
    {
        media: 'bien.jpeg'
    }

    )
    .addAnswer(['1️⃣ Agendar evaluación gratuita.',
        '2️⃣ Criolipólisis: Eliminación de grasa localizada.',
        '3️⃣ Velashape: Adiós a la celulitis.',
        '4️⃣ MEP: Tratamiento para estrías.',
        '5️⃣ Tratamientos faciales: ¡Cuida tu rostro!',
        '6️⃣ Depilación láser: Olvídate del vello.',
        '7️⃣ Solárium de Colágeno.',
        '8️⃣ Otro: Hablar con un especialista',
        ''
    ])
    .addAnswer(['Para obtener información detallada sobre cada tratamiento, por favor, envía el número correspondiente. (Para volver a mostrar el menu escribe *Menu*',
        '',
        '¡Estamos aquí para ayudarte! 💆‍♀️💆‍♂️',
    ],
    null,
    null,
    [flowAgendarEvaluacion, flowCriolipolisis, flowVelashape, flowMEP, flowTratamientosFaciales, flowDepilacionLaser, flowsolarium, flowOtro]
);

/**const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
*/
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()