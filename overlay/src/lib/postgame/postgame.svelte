<script>
    import {data, postGame, postgameData, lTeam, rTeam} from "../socketio.js"
    import {onMount} from "svelte/internal";
    import * as teamConfig from '../../teamconfig.json';

    onMount(() => {
        console.log("postgame loaded")
    })

    $: {
        if ($postgameData) {
            console.log($postgameData)
        }
    }
</script>

<main style="opacity: {$postGame ? 1 : 0}; position: absolute; top: 0; left: 0;">
  <svg id="Layer_2"  xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.8 259.2">
    <g id="Bottom_Scorebox_Abstract_Texture_Bottom_Image" >
      <g id="Blue_Background_Abstract_Design_Image" >
        <image id="Blue_Background_Abstract_Design_Image-2"  width="1920" height="1080" transform="scale(.24)" xlink:href="/src/lib/postgame/postgame1.png"/>
      </g>
      <image id="Top_Scorebox_Abstract_Texture_Top_Image"  width="1535" height="444" transform="translate(46.32 19.92) scale(.24)" xlink:href="/src/lib/postgame/postgame2.png"/>
      <image id="Bottom_Scorebox_Abstract_Texture_Bottom_Image-2"  width="1535" height="444" transform="translate(46.32 135.12) scale(.24)" xlink:href="/src/lib/postgame/postgame3.png"/>
    </g>
    <g id="Bottom_Scorebox_Team_Info" >
      <g id="Nemesis_Logo_Image" >
        <image id="Nemesis_Logo_Image-2"  width="249" height="249" transform="translate(337.92 162.48) scale(.24)" xlink:href="{teamConfig["teams"][$rTeam]["logo"]}"/>
      </g>
      <g id="bottom-name">
        <text transform="translate(56.12 163.72)" style="fill: #fff; font-family: BankSansEFCY-BolConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px; letter-spacing: .1em;">{$rTeam.toUpperCase()}</text>
      </g>
    </g>
    <g id="Bottom_Scorebox_Titles" >
        <image id="NAME_copy_Image-2"  width="97" height="22" transform="translate(57.6 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame5.png"/>
        <image id="SCORE_copy_Image-2"  width="119" height="22" transform="translate(91.44 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame6.png"/>
        <image id="GOALS_copy_Image-2"  width="115" height="22" transform="translate(131.52 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame7.png"/>
        <image id="ASSISTS_copy_Image-2"  width="152" height="22" transform="translate(169.92 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame8.png"/>
        <image id="SAVES_copy_Image-2"  width="114" height="22" transform="translate(217.68 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame9.png"/>
        <image id="SHOTS_copy_Image-2"  width="118" height="22" transform="translate(256.8 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame10.png"/>
        <image id="DEMOS_copy_Image-2"  width="123" height="22" transform="translate(296.16 177.36) scale(.24)" xlink:href="/src/lib/postgame/postgame11.png"/>
    </g>
    <g id="Player_1_Text_Bottom_" >
      <g id="name">
        <text transform="translate(68.45 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.orangePlayers[0]?.name}</text>
      </g>
      <g id="score">
        <text transform="translate(105.07 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.score}</text>
      </g>
      <g id="goals">
        <text transform="translate(145.08 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.goals}</text>
      </g>
      <g id="assists">
        <text transform="translate(188.8 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.assists}</text>
      </g>
      <g id="saves">
        <text transform="translate(232 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.saves}</text>
      </g>
      <g id="shots">
        <text transform="translate(271.6 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.shots}</text>
      </g>
      <g id="demos">
        <text transform="translate(311.4 197.01)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[0]?.demos}</text>
      </g>
    </g>
    <g id="Player_2_Text_Bottom_" >
      <g id="name-2" >
        <text transform="translate(68.45 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.orangePlayers[1]?.name}</text>
      </g>
      <g id="score-2" >
        <text transform="translate(105.07 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.score}</text>
      </g>
      <g id="goals-2" >
        <text transform="translate(145.08 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.goals}</text>
      </g>
      <g id="assists-2" >
        <text transform="translate(188.8 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.assists}</text>
      </g>
      <g id="saves-2" >
        <text transform="translate(232 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.saves}</text>
      </g>
      <g id="shots-2" >
        <text transform="translate(271.6 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.shots}</text>
      </g>
      <g id="demos-2" >
        <text transform="translate(311.4 212.61)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[1]?.demos}</text>
      </g>
    </g>
    <g id="Player_3_Text_Bottom_" >
      <g id="name-3" >
        <text transform="translate(68.45 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.orangePlayers[2]?.name}</text>
      </g>
      <g id="score-3" >
        <text transform="translate(105.07 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.score}</text>
      </g>
      <g id="goals-3" >
        <text transform="translate(145.08 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.goals}</text>
      </g>
      <g id="assists-3" >
        <text transform="translate(188.8 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.assists}</text>
      </g>
      <g id="saves-3" >
        <text transform="translate(232 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.saves}</text>
      </g>
      <g id="shots-3" >
        <text transform="translate(271.6 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.shots}</text>
      </g>
      <g id="demos-3" >
        <text transform="translate(311.4 228.21)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.orangePlayers[2]?.demos}</text>
      </g>
    </g>
    <g id="Top_Scorebox_Team_Info" >
      <g id="RLPC_Logo_Image" >
        <image id="RLPC_Logo_Image-2"  width="261" height="228" transform="translate(61.2 44.4) scale(.24)" xlink:href="{teamConfig["teams"][$lTeam]["logo"]}"/>
      </g>
      <g id="top-name">
        <text transform="translate(408.68 47.32)" text-anchor="end" style="fill: #fff; font-family: BankSansEFCY-BolConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 25px; letter-spacing: .1em;">{$lTeam.toUpperCase()}</text>
      </g>
    </g>
    <g id="Top_Scorebox_Titles" >
        <image id="NAME_Image-2"  width="97" height="22" transform="translate(138.24 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame5.png"/>
        <image id="SCORE_Image-2"  width="119" height="22" transform="translate(172.08 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame6.png"/>
        <image id="GOALS_Image-2"  width="115" height="22" transform="translate(212.16 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame7.png"/>
        <image id="ASSISTS_Image-2"  width="152" height="22" transform="translate(250.56 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame8.png"/>
        <image id="SAVES_Image-2"  width="114" height="22" transform="translate(298.32 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame9.png"/>
        <image id="SHOTS_Image-2"  width="118" height="22" transform="translate(337.44 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame10.png"/>
        <image id="DEMOS_Image-2"  width="123" height="22" transform="translate(376.8 59.76) scale(.24)" xlink:href="/src/lib/postgame/postgame11.png"/>
    </g>
    <g id="Player_1_Text_Top_" >
      <g id="name-4" >
        <text transform="translate(150.13 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.bluePlayers[0]?.name}</text>
      </g>
      <g id="score-4" >
        <text transform="translate(185.75 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.score}</text>
      </g>
      <g id="goals-4" >
        <text transform="translate(226.76 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.goals}</text>
      </g>
      <g id="assists-4" >
        <text transform="translate(268.48 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.assists}</text>
      </g>
      <g id="saves-4" >
        <text transform="translate(311.92 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.saves}</text>
      </g>
      <g id="shots-4" >
        <text transform="translate(352.28 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.shots}</text>
      </g>
      <g id="demos-4" >
        <text transform="translate(392.08 80.85)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[0]?.demos}</text>
      </g>
    </g>
    <g id="Player_2_Text_Top_" >
      <g id="name-5" >
        <text transform="translate(150.13 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.bluePlayers[1]?.name}</text>
      </g>
      <g id="score-5" >
        <text transform="translate(185.75 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.score}</text>
      </g>
      <g id="goals-5" >
        <text transform="translate(226.76 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.goals}</text>
      </g>
      <g id="assists-5" >
        <text transform="translate(268.48 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.assists}</text>
      </g>
      <g id="saves-5" >
        <text transform="translate(311.92 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.saves}</text>
      </g>
      <g id="shots-5" >
        <text transform="translate(352.28 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.shots}</text>
      </g>
      <g id="demos-5" >
        <text transform="translate(392.08 96.45)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[1]?.demos}</text>
      </g>
    </g>
    <g id="Player_3_Text_Top_" >
      <g id="name-6" >
        <text transform="translate(150.13 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px;">{$postgameData?.bluePlayers[2]?.name}</text>
      </g>
      <g id="score-6" >
        <text transform="translate(185.75 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.score}</text>
      </g>
      <g id="goals-6" >
        <text transform="translate(226.76 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.goals}</text>
      </g>
      <g id="assists-6" >
        <text transform="translate(268.48 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.assists}</text>
      </g>
      <g id="saves-6" >
        <text transform="translate(311.92 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.saves}</text>
      </g>
      <g id="shots-6" >
        <text transform="translate(352.28 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.shots}</text>
      </g>
      <g id="demos-6" >
        <text transform="translate(392.08 112.05)" text-anchor="middle" style="fill: #fff; font-family: BankSansEFCY-MedCom, &apos;Bank Sans EF CY Compressed&apos;; font-size: 8px; letter-spacing: .1em;">{$postgameData?.bluePlayers[2]?.demos}</text>
      </g>
    </g>
  </svg>
</main>

<style>

</style>