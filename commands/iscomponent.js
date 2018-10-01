const isCompSize = 8
const isCompGroupSize = 24

const greetings = ['Operator', 'Star-Child']

function tenno() {
  return greetings.charAt(Math.floor(Math.random() * greetings.length))
}

// exporting the function so the main part of the bot can call it
module.exports = {

  test: (msg) => {
    const data = msg.toLowerCase()
    // this is for testing where the weapon name will start
    let startingPoint

    // if after the command has an '@' that means that its on a group
    // so the name will only start after /iscomp@ordis-prime-bot
    if (data.substring(isCompSize) === '@') {
      startingPoint = isCompGroupSize
    // else it will start after /iscomponent
    }
    else {
      startingPoint = isCompSize
    }

    let test = data.substring(startingPoint, data.length)

    test = test.replace(/[{_}]/g, ' ') // remove underline

    switch (test) {
      // simple switch for each weapon that can be crafted intro another
      // the [name](link) is converted to an hyperlink with markdown
      case 'cernos':
        return '[Cernos](http://warframe.wikia.com/wiki/Cernos) is crafting component for the [Mutalist Cernos](http://warframe.wikia.com/wiki/Mutalist_Cernos)'
      case 'drakgoon':
        return '[Drakgoon](http://warframe.wikia.com/wiki/Drakgoon) is crafting component for the [Zaar](http://warframe.wikia.com/wiki/Zarr)'
      case 'latron':
        return '[Latron](http://warframe.wikia.com/wiki/Latron) is crafting component for the [Tiberon](http://warframe.wikia.com/wiki/Tiberon)'
      case 'grakata':
        return '2x [Grakata](http://warframe.wikia.com/wiki/grakata) are crafting components for the [Twin Grakatas](http://warframe.wikia.com/wiki/Twin_Grakatas)'
      case 'boltor':
        return '[Boltor](http://warframe.wikia.com/wiki/Boltor) + [Kronen](http://warframe.wikia.com/wiki/Kronen) are crafting components for the [Boltace](http://warframe.wikia.com/wiki/Boltace)'
      case 'kronen':
        return '[Boltor](http://warframe.wikia.com/wiki/Boltor) + [Kronen](http://warframe.wikia.com/wiki/Kronen) are crafting components for the [Boltace](http://warframe.wikia.com/wiki/Boltace)'
      case 'miter':
        return '[Miter](http://warframe.wikia.com/wiki/Miter) + [Hikou](http://warframe.wikia.com/wiki/Hikou) are crafting components for the [Panthera](http://warframe.wikia.com/wiki/Panthera)'
      case 'hikou':
        return '[Miter](http://warframe.wikia.com/wiki/Miter) + [Hikou](http://warframe.wikia.com/wiki/Hikou) are crafting components for the [Panthera](http://warframe.wikia.com/wiki/Panthera)'
      case 'lato':
        return '[Lato](http://warframe.wikia.com/wiki/Lato) is crafting component for the [Bolto](http://warframe.wikia.com/wiki/Bolto)'
      case 'bolto':
        return '2x [Bolto](http://warframe.wikia.com/wiki/Bolto) are crafting components for the [Akbolto](http://warframe.wikia.com/wiki/Akbolto)\nAnd 1x [Bolto](http://warframe.wikia.com/wiki/Bolto) + [Viper](http://warframe.wikia.com/wiki/Viper) are crafting components for the [Hystrix](http://warframe.wikia.com/wiki/Hystrix)'
      case 'akbolto':
        return '[Akbolto](http://warframe.wikia.com/wiki/Akbolto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) are crafting components for the [Akjagara](http://warframe.wikia.com/wiki/Akjagara)'
      case 'dual skana':
        return '[Akbolto](http://warframe.wikia.com/wiki/Akbolto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) are crafting components for the [Akjagara](http://warframe.wikia.com/wiki/Akjagara)\nAnd [Vasto](http://warframe.wikia.com/wiki/Vasto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) for crafting the [Redeemer](http://warframe.wikia.com/wiki/Redeemer)\nAnd [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) is crafting component for the [Dark Split Sword](http://warframe.wikia.com/wiki/Dark_Split-Sword)'
      case 'akstiletto':
        return '[Akstiletto](http://warframe.wikia.com/wiki/Akstiletto) is crafting component for the [Aksomati](http://warframe.wikia.com/wiki/Aksomati) and the [Sarpa](http://warframe.wikia.com/wiki/Sarpa)'
      case 'gammacor':
        return '[Gammacor](http://warframe.wikia.com/wiki/Gammacor) is crafting component for the [Heliocor](http://warframe.wikia.com/wiki/Heliocor)'
      case 'kraken':
        return '[Kraken](http://warframe.wikia.com/wiki/Kraken) is crafting component for the [Kulstar](http://warframe.wikia.com/wiki/Kulstar)'
      case 'bronco':
        return '2x [Bronco](http://warframe.wikia.com/wiki/Bronco) are crafting components for the [Akbronco](http://warframe.wikia.com/wiki/Akbronco)'
      case 'bronco prime':
        return '2x [Bronco Prime](http://warframe.wikia.com/wiki/Bronco_Prime) are crafting components for the [Akbronco Prime](http://warframe.wikia.com/wiki/Akbronco_Prime)'
      case 'cestra':
        return '2x [Cestra](http://warframe.wikia.com/wiki/Cestra) are crafting components for the [Dual Cestra](http://warframe.wikia.com/wiki/Dual_Cestra)'
      case 'furis':
        return '2x [Furis](http://warframe.wikia.com/wiki/Furis) are crafting components for the [Afuris](http://warframe.wikia.com/wiki/Afuris)'
      case 'kohmak':
        return '2x [Kohmak](http://warframe.wikia.com/wiki/Kohmak) are crafting components for the [Twin Kohmak](http://warframe.wikia.com/wiki/Twin_Kohmak)'
      case 'lex':
        return '2x [Lex](http://warframe.wikia.com/wiki/Lex) are crafting components for the [Aklex](http://warframe.wikia.com/wiki/Aklex)'
      case 'lex prime':
        return '2x [Lex Prime](http://warframe.wikia.com/wiki/Lex_Prime) are crafting components for the [Aklex Prime](http://warframe.wikia.com/wiki/Aklex_Prime)'
      case 'magnus':
        return '2x [Magnus](http://warframe.wikia.com/wiki/Magnus) are crafting components for the [Akmagnus](http://warframe.wikia.com/wiki/Akmagnus)'
      case 'vasto':
        return '2x [Vasto](http://warframe.wikia.com/wiki/Vasto) are crafting components for the [Akvasto](http://warframe.wikia.com/wiki/Akvasto)\nAnd 1x [Vasto](http://warframe.wikia.com/wiki/Vasto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) for crafting the [Redeemer](http://warframe.wikia.com/wiki/Redeemer)'
      case 'viper':
        return '2x [Viper](http://warframe.wikia.com/wiki/Viper) are crafting components for the [Twin Vipers](http://warframe.wikia.com/wiki/Twin_Vipers)\nAnd 1x [Viper](http://warframe.wikia.com/wiki/Viper) + [Bolto](http://warframe.wikia.com/wiki/Bolto) are crafting components for the [Hystrix](http://warframe.wikia.com/wiki/Hystrix)'
      case 'atomos':
        return '[Atomos](http://warframe.wikia.com/wiki/Atomos) + [Dual Zoren](http://warframe.wikia.com/wiki/Dual_Zoren) are crafting components for the [Twin Bazok](http://warframe.wikia.com/wiki/Twin_Basolk)'
      case 'dual zoren':
        return '[Atomos](http://warframe.wikia.com/wiki/Atomos) + [Dual Zoren](http://warframe.wikia.com/wiki/Dual_Zoren) are crafting components for the [Twin Bazok](http://warframe.wikia.com/wiki/Twin_Basolk)'
      case 'kunai':
        return '[Kunai](http://warframe.wikia.com/wiki/Kunai) + [Bo](http://warframe.wikia.com/wiki/Bo) are crafting component for the [Tipedo](http://warframe.wikia.com/wiki/Tipedo)'
      case 'bo':
        return '[Kunai](http://warframe.wikia.com/wiki/Kunai) + [Bo](http://warframe.wikia.com/wiki/Bo) are crafting component for the [Tipedo](http://warframe.wikia.com/wiki/Tipedo)'
      case 'kama':
        return '2x [Kama](http://warframe.wikia.com/wiki/Kama) are crafting components for the [Dual Kamas](http://warframe.wikia.com/wiki/Dual_Kamas)'
      case 'dual kamas':
        return '[Dual Kamas](http://warframe.wikia.com/wiki/Dual_Kamas) is crafting component for the [Dual Raza](http://warframe.wikia.com/wiki/Dual_Raza)'
      case 'krohkur':
        return '2x [Krohkur](http://warframe.wikia.com/wiki/Krohkur) are crafting components for the [Twin Krohkur](http://warframe.wikia.com/wiki/Twin_Krohkur)'
      case 'tipedo':
        return '[Tipedo](http://warframe.wikia.com/wiki/Tipedo) is crafting component for the [Lesion](http://warframe.wikia.com/wiki/Lesion)'
      case 'amphis':
        return '[Amphis](http://warframe.wikia.com/wiki/Amphis) is crafting component for the [Sydon](http://warframe.wikia.com/wiki/Sydon)'
      case 'ankyros':
        return '[Ankyros](http://warframe.wikia.com/wiki/Ankyros) is crafting component for the [Tekko]http://warframe.wikia.com/wiki/Tekko\nAnd [Ankyros](http://warframe.wikia.com/wiki/Ankyros) + [Dual_Cleavers](http://warframe.wikia.com/wiki/Dual_Cleavers) are crafting components for the [Ripkas](http://warframe.wikia.com/wiki/Ripkas)'
      case 'dual cleavers':
        return '[Ankyros](http://warframe.wikia.com/wiki/Ankyros) + [Dual_Cleavers](http://warframe.wikia.com/wiki/Dual_Cleavers) are crafting components for the [Ripkas](http://warframe.wikia.com/wiki/Ripkas)'
      case 'broken war':
        return '[Broken War](http://warframe.wikia.com/wiki/Broken_War) is crafting component for the [War](http://warframe.wikia.com/wiki/War)'
      case 'furax':
        return '[Furax](http://warframe.wikia.com/wiki/Furax) is crafting component for the [Knux](http://warframe.wikia.com/wiki/Knux)'
      case 'kogake':
        return '[Kogake](http://warframe.wikia.com/wiki/Kogake) is crafting component for the [Hirudo](http://warframe.wikia.com/wiki/Hirudo)'
      case 'magistar':
        return '[Magistar](http://warframe.wikia.com/wiki/Magistar) is crafting component for the [Sibear](http://warframe.wikia.com/wiki/Sibear)'
      case 'nikana':
        return '[Nikana](http://warframe.wikia.com/wiki/Nikana) is crafting component for the [Dragon Nikana](http://warframe.wikia.com/wiki/Dragon_Nikana)'
      case 'ninkondi':
        return '[Ninkondi](http://warframe.wikia.com/wiki/Ninkondi) is crafting component for the [Shaku](http://warframe.wikia.com/wiki/Shaku)'
      default:
        return `Ordis didn't find anything, ${tenno()}. Your weapon probably isn't used for any crafting.\nThis list was updated in April 20th, 2018.`
    }
  },
}
