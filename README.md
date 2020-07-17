<p align="center">
  <img src="./assets/img/logo.png" height="200" alt="Metacritic" />
</p>

  
<p align="center">
   Metacritic API is a provider of compilations on reviews of music albums, video games, movies, television shows, DVDs and books.
</p>
<p align="center">
  <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-blue.svg" />          
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img src="https://img.shields.io/badge/Metacritic-API-blue.svg"/>
</p>




## 🚧 Project in development
More details in the next days / months.

# 📖 API Documentation

## getGameReviews([options: GamesParamsOptions])
  
|  @interface          | @member  |     @type     |  @values                                                               |
|----------------------|----------|:-------------:|-----------------------------------------------------------------------:|
|  GamesParamsOptions  | filterBy |  string       |  new-releases, coming-soon, available                                  |
|                      | platform |  string       |  ps4, xboxone, switch, pc, ios, playstation-5, stadia, xbox-series-x   |
|                      | sortBy   |  string       |  date, metascore, name, userscore                                      |

```ts
(async() =>{
  const options = {
    filterBy: 'new-releases',
    platform: 'ps4',
    sortBy: 'date'
  }
  await getGameReviews(options)
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .catch(e => console.log(e))
})();
```


```json
{
  "title": "Ghost of Tsushima",
  "poster": "https://static.metacritic.com/images/products/games/0/260ef84455c9c9e47a0cdd2df24622bb-98.jpg",
  "summary": "The year is 1274. Samurai warriors are the legendary defenders of Japan -- until the fearsome Mongol Empire invades the island of Tsushima, wreaking havoc and conquering the local population. As one of the last surviving samurai, you rise from the ashes to fight back. But, honorable tactics won't lead you to victory. You must move beyond your samurai traditions to forge a new way of fighting -- the way of the Ghost -- as you wage an unconventional war for the freedom of Japan.",
  "score": 83,
  "release_date": "July 17, 2020",
  "platform": "PlayStation 4",
  "extra": [
    {
      "info": [
        {
          "contentRating": "ESRB M",
          "gamePlatform": "PlayStation 4",
          "operatingSystem": "PlayStation 4",
          "genre": [
            "General",
            "Action Adventure",
            "Open-World"
          ],
          "publisher": [
            {
              "@type": "Organization",
              "name": "Sony Interactive Entertainment",
              "url": "https://www.metacritic.com/company/sony-interactive-entertainment"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "bestRating": "100",
            "worstRating": "0",
            "ratingValue": "83",
            "ratingCount": "94"
          }
        }
      ],
      "videos": [
        {
          "trailer": [
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/05/14/Breakout_GhostOfTsushima_CombatAndStealth_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/05/14/Breakout_GhostOfTsushima_Exploration_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2018/06/14/Trailer_GhostofTsushima_E3Japanese_20180614_4000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2018/06/12/Trailer_GhostTsushima_E3_20180611_4000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/05/14/Breakout_GhostOfTsushima_CustomizationAndOutro_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/07/16/400168/Feature_GOT8CombatTips_20200715_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/07/15/399354/ghost_of_tsushima_kurosawa_mode_first_9_minutes_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/07/15/399353/ghost_of_tsushima_shrine_discovery_and_stealth_gameplay_8000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/06/29/372837/Trailer_GhostOfTsushima_20200629_4000.mp4",
            "https://static-gamespotvideo.cbsistatic.com/vr/2020/07/15/399972/Gameplay_GOTHardModeCamp_20200710_8000.mp4"
          ]
        }
      ],
      "reviews": [
        {
          "review": "Ghost of Tsushima takes the best elements of Assassins Creed and Far Cry, throws in some of the signature Sucker Punch flair that made Infamous so successful and ends up being something that is both familiar and unique at the same time. The stealth elements are not the strongest, and aside from the missions requiring stealth, I almost always took the more forward approach to combat, but the freedom to DO that is part of what makes the game so good. Sony has consistently released incredible, single player, story focused exclusives for the PS4, and Ghost of Tsushima stands tall as one of their best yet.",
          "review_critic": "Gaming Age",
          "review_date": "Jul 14, 2020",
          "review_grade": "100"
        },
        {
          "review": "Ghost of Tsushima is a riveting tale complemented by infinitely fascinating combat, inventive navigation mechanics, and arresting visuals, effortlessly earning itself a spot as one of the absolute best games released on the PlayStation 4.",
          "review_critic": "We Got This Covered",
          "review_date": "Jul 14, 2020",
          "review_grade": "100"
        },
        {
          "review": "While many of the elements here made their debuts in other games in the genre, Sucker Punch does an amazing job of weaving them together in a way that not only creates a satisfying gameplay experience but also enhances an already stellar narrative. I cannot think of a better way for Sony to send-off the generation.",
          "review_critic": "ZTGD",
          "review_date": "Jul 14, 2020",
          "review_grade": "100"
        },
        // .....
      ]
    }
  ]
}
```


## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---


## <img src="https://img.icons8.com/color/48/000000/paypal.png"> **Donations**
Metacritic API is an open source project licensed by MIT with continuous development. If you want me to continue maintaining this library and you are interested in continuing to use it, you can help me with a monetary help in the following link:


- [One-time donation via PayPal.](https://paypal.me/chrismperezsantiago?locale.x=en_US)

<a href="https://www.buymeacoffee.com/chrismichael" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

These are projects that take a lot of effort and time to maintain. So with your help I will be more motivated to continue maintaining the Metacritic API project.

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/ChrisMichaelPerezSantiago) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.


---


### **:robot: Author**

_*Chris Michael*_

> You can follow me on
[github](https://github.com/ChrisMichaelPerezSantiago)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright © 2020 [Metacritic](https://github.com/ChrisMichaelPerezSantiago/metacritic).
