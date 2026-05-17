import { createClient } from 'next-sanity'
import { randomBytes } from 'crypto'

const client = createClient({
  projectId: '29fou88c',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const key = () => randomBytes(6).toString('hex')

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

// shortDescription — показывается на карточке курса
const shortDescription =
  'Занятия для гибкого и сильного тела, женской магнетичной энергии, божественной осанки и красивого лица.'

// description — основной текст страницы курса (PortableText)
const description = [
  block('Ты входишь в пространство, где любовь к телу и забота о своём женском состоянии становится привычкой.'),
  block('Сразу после входа тебя уже ждут более 150 занятий на выбор.'),
  block('Здесь:', 'h3'),
  block('— начинаешь чувствовать своё тело практически на тонком уровне'),
  block('— можешь выбирать удобное время для занятий: утро, день, вечер'),
  block('— понимаешь, как хочет ТВОЁ тело, а не «как надо»'),
  block('— не тратишь время на дорогу и сборы в зал или студию, занимаешься дома в чём удобно, обувь не нужна'),
]

// benefits — список в аккордеоне «Что входит»
const benefits = [
  'ТЕРАПИЯ ТЕЛА — особый космос для тела и расслабленной головы. Кайфовая Relax-растяжка, работа с зажимами, здоровая и красивая спина',
  'СИЛОВЫЕ для красивых ягодиц — умный суперэффективный 25-минутный фитнес вместо железок в потном зале. Попочка приподнимается просто мгновенно!',
  'КРАСОТА ЛИЦА — скульптурируем лицо, убираем межбровку, нависшее веко, брыли, отёчность, укорочение шеи',
  'ЖЕНСКАЯ ТЕРАПИЯ — работаем с тазом, где живёт энергия сексуальности, убираем тазовый блок и раскручиваем Свадхистану',
  'САМОМАССАЖ — глубокотканные техники, которые залезут глубже, чем массажист, терапия с теннисным мячиком и роллом + висцеральный массаж',
  'ДЫХАТЕЛЬНЫЕ ПРАКТИКИ — раздышиваем зажатую диафрагму и рёбра, переходим на женские расслабленные энергии удовольствия',
  'БОНУС: Возможность получить личную консультацию Юлии в чате',
]

async function run() {
  const courses = await client.fetch(`*[_type == "course"]{ _id, title, slug }`)
  console.log('Все курсы:')
  courses.forEach(c => console.log(`  [${c._id}] ${c.title} — ${c.slug?.current}`))

  const klub = courses.find(c =>
    c.title?.toLowerCase().includes('клуб') ||
    c.slug?.current?.includes('klub') ||
    c.slug?.current?.includes('club')
  )

  if (!klub) {
    console.error('✗ Курс «Женский онлайн-клуб» не найден')
    return
  }

  await client.patch(klub._id).set({ shortDescription, description, benefits }).commit()
  console.log(`✓ Обновлён: ${klub.title}`)
}

run().catch(console.error)
