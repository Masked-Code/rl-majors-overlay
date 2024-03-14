<script>
  import { panelData, timerData, duration } from "../socketio.js";
  import * as teamConfig from "../teamconfig.json";
  import Ticker from "svelte-ticker";

  let timer = 0;
  let loop;
  let pastTimer;
  let time;

  $: {
    if ($panelData) {
      console.log($panelData.tickertext.split(","));
    }
    if ($timerData != pastTimer) {
      clearInterval(loop);
      pastTimer = $timerData;
      timer = $timerData.time * 60;
      loop = setInterval(() => {
        timer--;
      }, 1000);
    }

    if ($timerData.time == 0 && $timerData.text == "") {
      clearInterval(loop);
    }

    if (timer <= 0) {
      timer = 0;
      clearInterval(loop);
      time = "";
      $timerData = {
        time: 0,
        text: "",
      };
    }

    if (timer) {
      time = `${Math.floor(timer / 60)}:${
        timer % 60 < 10 ? "0" + (timer % 60) : timer % 60
      }`;
    }
  }
</script>

<main style="position: absolute; top: 0; left: 0;">
  <div class="tickcontainer" style="overflow: hidden; width: 65%; padding: 0; margin: 0; position: absolute; top: 1000px; left: 380px;">
    {#if $panelData.tickertext != ""}
    {#key $duration}
      <Ticker
        direction="left"
        duration="{$duration}"
        delay="0"
        loop="true"
        pausing=false
        behavior="always"
      >
        <p
          id="orangebar-text"
          style="color: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 30px;"
        >
          {$panelData.tickertext}
        </p>
      </Ticker>
      {/key}
    {/if}
  </div>
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe style="position: absolute; top: 160px; left: 608px; width: 379px; height: 596px; border: none;" allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;" src="{`${$panelData.caster1url ? $panelData.caster1url + "&cleanoutput&transparent" : ""}`}"></iframe>
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe style="position: absolute; top: 160px; left: 1164px; width: 379px; height: 596px; border: none;" allow="autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;" src="{`${$panelData.caster2url ? $panelData.caster2url + "&cleanoutput&transparent" : ""}`}"></iframe>
  <svg
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    width="1920"
    height="1080"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 460.8 259.2"
  >
    <g id="background">
      <image
        id="background"
        width="1920"
        height="1080"
        transform="scale(.24)"
        href={$panelData.transparent === 1 ? "/caster-screen/src/pregame/transparent-caster.png" : "/caster-screen/src/pregame/artboard 11.webp"}
      />
    </g>
    <g id="Casters_Group" data-name="Casters Group">
      <g id="Left_Caster_Layer_28_copy_2_Image">
        <image
          id="Left_Caster_Layer_28_copy_2_Image-2"
          width="384"
          height="601"
          transform="translate(145.92 38.88) scale(.24)"
          href="/caster-screen/src/pregame/artboard 12.png"
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
      <g id="Right_Caster_Layer_28_Image">
        <image
          id="Right_Caster_Layer_28_Image-2"
          width="384"
          height="601"
          transform="translate(279.36 38.88) scale(.24)"
          href="/caster-screen/src/pregame/artboard 12.png"
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
    </g>
    <g id="Left_Caster_Bar">
      <g id="Black_Bar_Image">
        <image
          id="Black_Bar_Image-2"
          width="384"
          height="45"
          transform="translate(145.92 187.68) scale(.24)"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX4AAAAqCAYAAAC0sjCpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAHsElEQVR4nO1cXZK0KBBMJvZ++7L3P8fuy7gx8Q12mVBQIP1jd2aEMWNZoo2QRYpU2v75e8NVkH7vM5lbTvx38+0N25ay/dfmnVfs0zWTc36tfOO/NY6V1w34Ffd1PPYN7xy+j4af97vJbwtfq/E7Q/uV3wxbvxWflq3VnlBpT4JwDfz716UeVOb7n16cjO2nc26/HTAf2/e3ox22M99sydi2A9FkByYKSyypfqxru52byHfjcryyvG3/fUysf7Yv8/83BssevJ9EfptbhqnLaH3y+bDnm/o1db4VPjg+Z24j9nnlNpiSaWPG35YhCC+KaxG/hdUpB7K3nROGeZzOnO3Glsi2VYikdl54v0Wa+R6M70bHWoTultsg7y8q77tXxsg1Kr6Jg0CnLup251m4z+rmY4PAzz91NVAhfGvzBhzAsXEqCAgviOsSP2NYDTiddqkaGNx3zktk35jkRgm541eogf2cRsA5bKnymqm+JfIplM5+/I5qwDzT7TAoCKgBrz1lf6sGFASEF8H7EL9FSA00OjNQEgQsUQ2oATdQ9Px9YitGzFOkHyDxGTUwci8V37AaaJJ/Y/RffVaoqoH9lZD1yW2kIPVKe/IGHMDRVxAejPckfsYZNYAnqYGgrVQDCwi54VdVA3s9DaiBwP105z32Y4vVwO/+sW4jasD+LqkB4XXxGcRv0VMD3DnhjOrsyBGWqE6ogch+izDhqIEo6Ud8OAj8nrOhE3QWBKAhpbPbB+YC3H34auDQRoxNakB4YXwe8TNYDeyvgh6lBibUQZPYHKKsleFeozN6R+mX6HrfXF7x2ea54HDqK6ih+uXjrAby56KW3BtqoNWeaooU5h4EYRFE/BZn1UBjpFdXA/yKARPqIEZ2iez+a5N5MrbblzknrgYGA4S5n9NqgOt+cD+ZMrtqgNtNtT1JDQj3g4i/hRk1AKczZ2bIh3iCGLivGmgRZa0Mt8zYpHBcDYwHlZ6/fTfvBhzv/Mi9ufsBNVBtI1IDwmMh4o8iqgY4QHCn7aiBQxDAg9QAHZtSAwN+hwniLTopPBEgcAw4+wRtrxyuS657Q/Lu8eVqgCbEpQaEExDxz6KmBtLvSmFURmlBNZCAw0g/vnhsYnQaUQMRsu0db/h/0TH3c1GsCRC+0ol/Tjtd3zNqwC4e45XCUgPCJET8K7AHAdNpm5+Lop9KAoaoamrA+8KIfWr7XRKbTSXRIOfD9Xy/U2qgG4SOn5ImOh76Cqpalx010Fo8Zuq8qgYi602kBoRBiPhXI7R4DDcigNeZsVAN9NRB/BXRsBqI+lT8w2rgxKSw3UJqYCQohPbxQDWgxHLCH4j4743hxWMBNZD7/vTiMSWW622J/JRYTngniPgfieVq4GZLZFNiubMB6LiFlU7TPrCYjOrfBgEosZxwEiL+Z2JYDSixnLcpsZz1QVsNeO0p+2uC+O0h4n8VhNRAozMDJUHAEtWJVBJASWRVf5/YhhZYueQYW0OgxHLkk9tIQeqV9tRan2J9hUtDxP+qOKMG8CQ1ELSVamABITf8lFjOBg8mfPu7pAY+BSL+KyC6eAw0egP6aoBsSiy3NgANKZ3dPjAX4O7DVwOHNmJsUgMfAxH/FTGTSmKpGliYSoL8/E8qeyTbGb2j9Et0PSWWY8JXKol3hYj/6jirBhojvboa4FcMmFAHMbJLZFdiOUyO/icXj1VtHByI7KUGLgER/7thRg3A6cyZGfIhniAG7qsGWkRZK8MtMzYpHFcD40Gl52/fzSuxnHBviPjfGVE1wAGCO21HDSix3JprZN90sCmxnLAeIv5PQk0NJCix3CB5K7FcIh+Uqi8vHuOVwlIDLwER/6diDwKm0zY/F4USyzl+SixXuQ7IRm1EauC5EPELd0glcfNNwKQa6KmD+CuiYTUQ9an4K7EcPUNuI8NqgAKEsAQifqHE8OKxgBrIfX968djEXAAM2UypgSghB9UABssevJ9EfkosJ3gQ8QttLFcDN1simxLLnQ1AFAg4CHTqom4fWExG9W+DAJRY7qUg4hfGMKwGlFjO25RYzvqgrQa89pT9NUE8BBG/MI+QGmh0ZqAkCFiiOpFKAiiJrOrvE1sxYp4i/dgaAiWWI5/cRgpSr7Sn1voU6yvsEPEL63BGDeBJaiBoK9XAAkJu+CmxnA0eTPj2d0kNzEDEL9wH0cVjoNEb0FcDZFNiubUBaEjp7PaBuQB3H74aOLQRY5MamIKIX3gMZlJJLFUDC1NJkJ//SWWPZDujd5R+ia6nxHJM+EolEYGIX3g8zqqBxkivrgb4FQMm1EGM7BLZlVgOk6P/ycVjVRsHByL7D1QDIn7h+ZhRA3A6c2aGfIgniIH7qoEWUdbKcMuMTQrH1cB4UOn523fzSix3LYj4hddCVA1wgOBO21EDSiy35hrZNx1sSiz36hDxC6+NmhpIUGK5QfJWYrlEPihVX148xiuF31ANiPiF62APAqbTNj8XhRLLOX5KLFe5DshGbeSd1ICIX7gmQovHcCMCeJ0ZC9VATx3EXxENq4GoT8VfieXoGXIbGVYDFCBeED/E/5+oT7g8hhePBdRA7vvTi8cm5gJgyGZKDUQJOagGMFj24P0k8lNiubsjifMFQRA+DQD+B+fjeZL/ZzEWAAAAAElFTkSuQmCC"
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
      <g id="White_Vertical_Bar_Image">
        <image
          id="White_Vertical_Bar_Image-2"
          width="18"
          height="45"
          transform="translate(145.92 187.68) scale(.24)"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAqCAYAAAC6EtuqAAAACXBIWXMAAC4jAAAuIwF4pT92AAABUUlEQVRIiZ1USXLEMAgEiv8/MFXJP+YSUrZGYpUHhYvlhm6x2fjz/SUACIighgj6an35zHgFW3ZJxukaZ1wIMBGtYOuw55yBCvK4/TlIBQMGtwCVqXVFmAi3BI+hqVQxRqKc2iZdFdFGMyEl1eqmiE0RnUJJ0JsqDO4S7B40CHG0I4MPQe4cM7CLtAuqlmuexyJ9CKrO7yvnGA/ITuMq4b3KXYJ/3FOgRNaYZ4F7Ckir55BjMsF+7LCaGB0PhPjKaNLuEKKx+xs1CEnglBCNzsKrDP5jMjjSFhD7kEYGYsOkDpHh41NCNBYpCFKnWwmxgpkg3lniLoM9QVIyE0slrNSlh3F164kIX+Q+wS2E70HljFiajDiBFFkSIsa2w5Jr8FiB6xQeCOVSSeiBJ/S3k58J9Xdh/aMHB4Ro9cfUEVwlALzu+J3Q3q7f4e8pyRsA/AG3KqTx9m231AAAAABJRU5ErkJggg=="
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
      <g id="MRBEPIC">
        <text
          transform="translate(156.5 195.45)"
          style="font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 9px; letter-spacing: .1em; opacity: {$panelData.transparent === 1 ? 0 : 1};"
          >{$panelData?.caster1name}</text
        >
      </g>
    </g>
    <g id="Right_Caster_Bar">
      <g id="Black_Bar_Image-3">
        <image
          id="Black_Bar_Image-4"
          width="384"
          height="45"
          transform="translate(279.12 187.68) scale(.24)"
          href="data:image/png;base64,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"
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
      <g id="White_Vertical_Bar_Image-3">
        <image
          id="White_Vertical_Bar_Image-4"
          width="18"
          height="45"
          transform="translate(279.12 187.68) scale(.24)"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAqCAYAAABV0LCUAAAACXBIWXMAAC4jAAAuIwF4pT92AAABW0lEQVRIiaVVW47DMAgEi/sfsNLuSbpLlfjBMwlJ+TEemDHYpMXfnxfDbgiI3etbBNnqWPQJRxS1Qiow84aPC9lEmlHWQe3HSkSUWkMXvDrdYbDawbTMqhBha6cki6HqWjBq2PIyD0oXIbn8cSeelJ/osSk0XueMJCdmGOzttHab5J99iVwlGt9Xsp0m03qcmA3g9JNKjqfW++PYfrFV0vKNDtqxr5LsgjL2eanXIjDnRPcX8yJJ/1DA+gC9yAXJb0lPa5Xkjcy3UCQFEVQX+dTatwJ7JY+ZLEtdhPXCxUpYp3Kewj1GT0je6CggojHmObRSWbGtlg6mODFXSRyKmhhlpNUG1zDaBL4VWu3USWZg4p1kCR4LL9bvhPOEE5LHpJK1hH4sluD2iU9I6eCNLfWEjFSf4nUnx6T8O9Lx0E6F5C2M/a1KZjsA8AaAv51zJpjb9kf+f5cUDQA+VGmt/Gf088QAAAAASUVORK5CYII="
          style="opacity: {$panelData.transparent === 1 ? 0 : 1};"
        />
      </g>
      <g id="MRBEPIC-2">
        <text
          transform="translate(289.7 195.45)"
          style="font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-weight: 400; font-style: oblique; font-size: 9px; opacity: {$panelData.transparent === 1 ? 0 : 1};"
          >{$panelData?.caster2name}</text
        >
      </g>
    </g>
    <g id="Twitter_Icon_Image-5">
      <image
        id="Twitter_Icon_Image-6"
        width="34"
        height="27"
        transform="translate(46.32 248.88) scale(.24)"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAYCAYAAACfpi8JAAAACXBIWXMAAC4jAAAuIwF4pT92AAADm0lEQVRIibWWb0jbaBzHs9TVOLVamRZzHNydUCj0xah/Br4Zm7pzr27H3fmucAcyEFwPQT18I44K4oEFRdgbX0Qy5nBKqQQFEXXq2VPcvMVJLNZizQr2uqz513R5qnGkMKiuaOPWz4tA2+f3+33yfUryQCo0TXcAAE5Utra2PE6n0wRliN1uN1IU9e+JBiRJktxud/fExMRv8/Pzj/v7+39OTotGo49S2/h8vlfT09N3MlEZGBi4r0VCJR6PfxBFMQIAkAiCeNDT02NINtvY2Og4Pj4+tZjneX5xcbG/vb299DyRhYWFAa0iKqIoiru7u7+faobj+D1ZlpV0BaFQKDA7O/uIIAir0+m8clYkHA4/0SoBAFAwDGtK7ZOjXkiSfFFZWfnKYrFUnh2Eouj3KIp28zz/sLS0dLG+vn6e5/nXoVDobTAYPNzZ2YmWlZVl+pf6hEKSJJn2F5fLZWNZls8wVoFl2fDh4aGPYZjQJRKRh4eHLanzYfUyMzPTaLPZiicnJzsEQfj/otvJz88vKCoqKjOZTOaSkhJUaxwAABEA8D71u+TWFBQU3K6qqvrTbDZvwzCs09pYKzzPv5Vlmf2szO12308kEloTvjSrq6ujZx2SW4Nh2Jzf7/8v20l8giRJb1oRj8cjjo6OtqsPmmxLsCwbYRjmn3MXjY+P2zmOi2RzW7xe73Rzc/PVC40xDLNSFIULgpAVoaGhoT/SzYVTP3R1dZVbrVY7BEFcLBZ7pzn3CwgEAi9pmn524cKWlhb90tLSZDaSUOns7PwpY+umpqZvAoGA/2tLzM3NPa2trdVrirC1tdWyvb394mtJ7O/v7zQ0NJSfNzPtU3R9ff1dXl7ec71eH47FYieKokgIglyHYRhOt/48otEo43K57DiOv9Fa+xkEQXSrLyqtSUQikfe9vb33vmj41NRUMY7jv+7t7S3IsvxBqwTDMP6RkZGMTnkqVwYHBysaGxuLKYqSCwsLDUaj0SSK4g0URX+sqKi4eZmb2Nzc9KysrPzlcDh8mdbkyLKcKwiCo6am5pbBYPgWQRBYp9P+Aj46OoI4jvOtra39fXBw8MThcAAt9cmjX19f31Wz2Xy3urr6F51OdwtF0R8ybcBxHEvTtJdlWQ8A4HldXd2pc4YmkVTGxsa+SyQSNovFchNF0Ru5ubnlCIJcUxQlB4ZhRZbleDwej0qSRAWDwZdGo3FteXn5TVtbW+IyAkkgCPoIWgtWvhlkaZUAAAAASUVORK5CYII="
      />
    </g>
    <g id="Tiktok_Icon_Image">
      <image
        id="Tiktok_Icon_Image-2"
        width="28"
        height="32"
        transform="translate(62.16 248.16) scale(.24)"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAfCAYAAAAWRbZDAAAACXBIWXMAAC4jAAAuIwF4pT92AAADb0lEQVRIib2Wb0gTYRzH7263u53LiyQo7sUSkY3ejGybE0EElV5EGVKhYL0YqC9GpvmiojeiEJT6QtLtRRmYhEvQCI4W1jCMGMM/L1TaEISYTqdw/sE/23Hn7uLJlLndbjqXX3jgeJ7n9/s8v9/v+XNQKnK73QUMw6yJMerr63sq5w5JiZZARUVFd6xWK3kqsOzsbIPZbH6QTp8J0wgUCoXCTqezSsourZEBEQShKi0tfe3xeJ4NDAyoosfQdMOAMAzLNBqNzzUaTYXD4XizsbHh0Wq1wZScyaVRSjzPg/T++C+RxQpFUdCy0lYzlmW3FxYWfIIgJJrCpw22tbW1PTQ0ZB0dHbUEAoFfElMQyTR2dHToTSbTdaPReJlhmHMsy+IwDH/WarWvEsFgGMYoigqVlJT0dnV1faMoqiw/P/8WQRAGHMcvYBgmHoLZ7Xa9wWB4nJeXd1ehUGAIgkAajWZ/5TsQBP2FiaIYB1MoFDBJkkrwXV9fvwhB0DvQmpubSaVSeVEQBNUBbHh4+F5BQcFLkiQpqZVHIpGQXBqBpOrV0tKyCUEQaHvnrL+//35xcfFbHMeVyRyeRIjVai0sLy/vSgZCUfTMSWFodXX1E7VafTZ2gOO4Hb/f/2F6eno6HA4r9Xr97/0xGIZTgxUWFt6M7VxZWZmjabqutrb2u5QRjuNgQ8T1S22caIFzdmiZHMeF7Ha7JREI+rfzYu3Azs3IyJANOe5QT01NOVtbW3/KGUlFgCAITBDE8WBjY2Of5Aygvc0CaIeIoI4gumPBRFFkk8GWlpZAKg/Zgpt9dXVVtmhxMJPJVJYMtra2lqNWqzOj+yKRSHh9fX31WDCdTne7srIyJ5FBY2NjRm5ubh0SkzOGYeYmJyfnZFcp9diNj49/bWpquhQ7d3BwkHC5XDYpm97e3hZZEFAgEPBIGYOz5nK5Hnm93vyZmZmrDoej2u/3u6Xmsiy72dDQkJsU1tbWVsHzPCf3rAuCIPvs22w22Z/TA1ksFoSm6Rey3mQ0MTHx0Ww2E0eCAbW3t8MjIyNtgiDwR4Xs7u6KPp/vfWdnZ8I/YFnRNF01OzsrWcNoBYPBWbfb/bC7u/tYT1Lc9dLT03OeoqhrJEne0Ol0V1QqVRY4IhzHbc7Pz3sXFxedy8vLX2pqavwpRXQqgiDoDxC2ohc4efTRAAAAAElFTkSuQmCC"
      />
    </g>
    <g id="Youtube_Icon_Image">
      <image
        id="Youtube_Icon_Image-2"
        width="35"
        height="25"
        transform="translate(76.56 249.12) scale(.24)"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAXCAYAAABqBU3hAAAACXBIWXMAAC4jAAAuIwF4pT92AAABlElEQVRIicXWz4vOURTH8dcZRpgiiWIxWbBgJ3+A7ChsbEZDspEs/QvW/geLyUJJsbeyZauwsfCjFGOYzHhmnqtTVz0Li+d+v988nzrd1T3n3T3nnnOilFL8f73FMl7OzSB46gRuYN+sAFKXcKQFYBu/BwRYxLFpAbJOPuEpvg0IcXxagMDnmre7eIPNAQAWW1KwC+OIeICLWMGP+jpddagFICpE6h1u4xZe9YDo9gsiokTEFh7jCu5jvYOr3b2+YUSMIuI97uEqnmPU4GJ+kD4QEWsR8ax2t5WWu4M1olLKAi7jTMO18c6Bgp+tRXkOhxuubvUCKKUcxTUs4XQHF6NWgO0aeAfO42Y9FzoET220AGxGxHop5WSt+KU61fpodVqAbDR7SikZ+Dou9Az8Vx+nXUjG+FWn4YGBgqeWp32BuZrnrrn+l37mZjTLheQFPswKINP5CF8zBfkU83XaTVrC5dlVWTdpWWOTlnX0MJebiNjIIryDU9g/keeDOauxtzppUYLnpFzFF6xV+17tNZ7k/IA/KFNrf8APBZkAAAAASUVORK5CYII="
      />
    </g>
    <g id="RLSC">
      <text
        transform="translate(7.27 255.33)"
        style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 10px; letter-spacing: .1em;"
        >RLSC</text
      >
    </g>
    <g id="Tonight_s_Lineup">
      <text
        transform="translate(4.96 40.53)"
        style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 8px;"
        >{$panelData?.lineuptext ? `${$panelData?.lineuptext} Lineup` : ""}</text
      >
    </g>
    <g id="RLSC-2">
      <text
        transform="translate(37.52 18.45)"
        style="fill: #fff; font-family: BankSansEFCY-BolConObl, Bank Sans EF CY Condensed; font-size: 14px; letter-spacing: .1em; font-weight: bold; font-style: oblique;"
        >RLSC</text
      >
    </g>
    <g id="_4:59">
      <text
        dominant-baseline="middle"
        text-anchor="middle"
        transform="translate(430.31 246.63)"
        style="fill: #fff; font-family: BankSansEFCY-MedCon, Bank Sans EF CY Condensed; font-size: 15px; letter-spacing: .1em;"
        >{time || ""}</text
      >
    </g>
    <g id="BACK_IN">
      <text
        dominant-baseline="middle"
        text-anchor="middle"
        transform="translate(430.31 231.21)"
        style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 10px; letter-spacing: .1em;"
        >{$timerData?.text || ""}</text
      >
    </g>
    <g id="Matchup_3_Text">
      <g id="NEMESIS">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(16.26 235.44)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname13 ? teamConfig["teams"][$panelData?.teamname13][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="FRONTLINE">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(50.26 235.44)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname23 ? teamConfig["teams"][$panelData?.teamname23][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="Frontline_Logo_Image">
        <image
          id="Frontline_Logo_Image-2"
          width="66"
          height="71"
          transform="translate(42.24 208.56) scale(.24)"
          href={$panelData?.teamname23 ? teamConfig["teams"][$panelData?.teamname23]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="VS">
        <text
          transform="translate(29.82 218.5)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname13 ? "VS" : ""}</text
        >
      </g>
      <g id="Nemesis_Logo_Image">
        <image
          id="Nemesis_Logo_Image-2"
          width="72"
          height="72"
          transform="translate(7.92 208.32) scale(.24)"
          href={$panelData?.teamname13 ? teamConfig["teams"][$panelData?.teamname13]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="Lower_Division">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 190.14)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 8px;"
          >{$panelData?.division3 ? `${$panelData?.division3} Division` : ""}</text
        >
      </g>
      <g id="Grand_Final">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 200.26)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 6px;"
          >{$panelData?.divisionround3 || ""}</text
        >
      </g>
    </g>
    <g id="Matchup_2_Text">
      <g id="NEMESIS-2">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(16.26 171.12)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname12 ? teamConfig["teams"][$panelData?.teamname12][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="FRONTLINE-2">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(50.26 171.12)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname22 ? teamConfig["teams"][$panelData?.teamname22][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="Frontline_Logo_Image-3">
        <image
          id="Frontline_Logo_Image-4"
          width="66"
          height="71"
          transform="translate(42.24 144.24) scale(.24)"
          href={$panelData?.teamname22 ? teamConfig["teams"][$panelData?.teamname22]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="VS-2">
        <text
          transform="translate(29.82 154.18)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname12 ? "VS" : ""}</text
        >
      </g>
      <g id="Nemesis_Logo_Image-3">
        <image
          id="Nemesis_Logo_Image-4"
          width="72"
          height="72"
          transform="translate(7.92 144) scale(.24)"
          href={$panelData?.teamname12 ? teamConfig["teams"][$panelData?.teamname12]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="Lower_Division-2">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 126.82)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 8px;"
          >{$panelData?.division2 ? `${$panelData?.division2} Division` : ""}</text
        >
      </g>
      <g id="Grand_Final-2">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 135.94)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 6px;"
          >{$panelData?.divisionround2 || ""}</text
        >
      </g>
    </g>
    <g id="Matchup_1_Text">
      <g id="NEMESIS-3">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(16.26 104.5)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname11 ? teamConfig["teams"][$panelData?.teamname11][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="FRONTLINE-3">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(50.26 104.5)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname21 ? teamConfig["teams"][$panelData?.teamname21][
            "name"
          ].toUpperCase() : ""}</text
        >
      </g>
      <g id="Frontline_Logo_Image-5">
        <image
          id="Frontline_Logo_Image-6"
          width="66"
          height="71"
          transform="translate(42.24 77.04) scale(.24)"
          href={$panelData?.teamname21 ? teamConfig["teams"][$panelData?.teamname21]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="VS-3">
        <text
          transform="translate(29.82 86.98)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 5px; letter-spacing: .1em;"
          >{$panelData?.teamname11 ? "VS" : ""}</text
        >
      </g>
      <g id="Nemesis_Logo_Image-5">
        <image
          id="Nemesis_Logo_Image-6"
          width="72"
          height="72"
          transform="translate(7.92 76.8) scale(.24)"
          href={$panelData?.teamname11 ? teamConfig["teams"][$panelData?.teamname11]["logo"] : "/caster-screen/src/assets/logos/test.png"}
        />
      </g>
      <g id="Lower_Division-3">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 59.62)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 8px;"
          >{$panelData?.division1 ? `${$panelData?.division1} Division` : ""}</text
        >
      </g>
      <g id="Grand_Final-3">
        <text
          dominant-baseline="middle"
          text-anchor="middle"
          transform="translate(33 68.74)"
          style="fill: #fff; font-family: BankSansEFCY-MedConObl, Bank Sans EF CY Condensed; font-size: 6px;"
          >{$panelData?.divisionround1 || ""}</text
        >
      </g>
    </g>
    <g id="orangebar">
      <text id="orange-text" data-name="Next Up: Team Frontline vs. Nemesis!" transform="translate(90.66 236)" style="fill: #fff; font-family: BankSansEFCY-MedConObl, &apos;Bank Sans EF CY Condensed&apos;; font-size: 12px;">{$panelData?.bottomorangebar}</text>
    </g>
  </svg>
</main>

<style>
  .tickcontainer {
    clip-path: polygon(3% 100%, 96% 100%, 100% 0, 0 0);
  }
</style>
