import sharp from "sharp";

export async function GET() {
  const response = await fetch('https://api-web.nhle.com/v1/player/8479318/landing')
  const data = await response.json()
  let width = 1200;
  let height = 630;
  let fullSeason = 81
  let {goals} = data.featuredStats.regularSeason.subSeason
  let fullName = `${data.firstName.default} ${data.lastName.default}` 
  let {gamesPlayed} = data.featuredStats.regularSeason.subSeason
  let goalPace = Math.round((data.featuredStats.regularSeason.subSeason.goals / data.featuredStats.regularSeason.subSeason.gamesPlayed) * 81)


  const Subtitle = Buffer.from(`
    <svg width="${width}" height="${height}">
        <text x="50%" y="23%" text-anchor="middle" fill="#fff" font-family="monospace" font-size="35" >
          ${ goals < 70 ? `${fullName} has ${goals} goals in ${gamesPlayed} games!` : `${fullName} has a total of`}
        </text>
        <text x="50%" y="60%" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="275" font-weight="900" >
          ${goals < 70 ? 70 - goals: goals}
        </text>
        <text x="49%" y="70%" text-anchor="middle" fill="#fff" font-family="sans-serif" font-size="55" font-weight="900" >
          ${ goals < 70 ? `Until 70! ` : `goals in ${gamesPlayed} games.`}
        </text>
        <text x="50%" y="80%" text-anchor="middle" fill="#fff" font-family="monospace" font-size="35" >
          ${ goals < 70 ? `${fullSeason - gamesPlayed} games remaining. On pace for ${goalPace} goals.` : null}
        </text>
        <text x="50%" y="93%" text-anchor="middle" fill="#fff" font-family="monospace" font-size="20" font-weight="700" >
          34to70.com
        </text>
    </svg>
  `)
  const png = sharp({
    create: {
      background: '#00205b',
      height: height,
      width: width,
      channels: 3
    }
  })
  .composite([
    {
      input: Subtitle, 
      tile: false,    
    }
])
  const pngBuffer = await png.toFormat("png").toBuffer()
  // return the response using the png buffer
  return new Response(pngBuffer);
  }