//exporting the function so the main part of the bot can call it
module.exports = {

	test: function(data){
		//this is for testing where the weapon name will start
		var startingPoint;

		//if after the command has an '@' that means that its on a group so the name will only start after /iscomp@ordis-prime-bot
		if(data.substring(8) === '@'){
			startingPoint = 24;
		//else it will start after /iscomponent
		}else{
			startingPoint = 8;
		}

		//this will test, from the starting point that was set in the if before, until the end of the string.
		switch(data.substring(startingPoint, data.length)) {
			//simple switch for each weapon that can be crafted intro another
			//the [name](link) is converted to an hyperlink with markdown that the user can click to go to the wiki for that especific weapon
	    	case 'cernos':
	       		return '[Cernos](http://warframe.wikia.com/wiki/Cernos) is crafting component for the [Mutalist Cernos](http://warframe.wikia.com/wiki/Mutalist_Cernos)';
	       		break;
	       	case 'drakgoon':
	       		return '[Drakgoon](http://warframe.wikia.com/wiki/Drakgoon) is crafting component for the [Zaar](http://warframe.wikia.com/wiki/Zarr)' ;
	       		break;
	       	case 'latron':
	       		return '[Latron](http://warframe.wikia.com/wiki/Latron) is crafting component for the [Tiberon](http://warframe.wikia.com/wiki/Tiberon)' ;
	       		break;
	       	case 'grakata':
	       		return '2x [Grakata](http://warframe.wikia.com/wiki/grakata) are crafting components for the [Twin Grakatas](http://warframe.wikia.com/wiki/Twin_Grakatas)' ;
	       		break;
	       	case 'boltor':
	       		return '[Boltor](http://warframe.wikia.com/wiki/Boltor) + [Kronen](http://warframe.wikia.com/wiki/Kronen) are crafting components for the [Boltace](http://warframe.wikia.com/wiki/Boltace)' ;
	       		break;
	       	case 'kronen':
	       		return '[Boltor](http://warframe.wikia.com/wiki/Boltor) + [Kronen](http://warframe.wikia.com/wiki/Kronen) are crafting components for the [Boltace](http://warframe.wikia.com/wiki/Boltace)' ;
	       		break;
	       	case 'miter':
	       		return '[Miter](http://warframe.wikia.com/wiki/Miter) + [Hikou](http://warframe.wikia.com/wiki/Hikou) are crafting components for the [Panthera](http://warframe.wikia.com/wiki/Panthera)' ;
	       		break;
	       	case 'hikou':
	       		return '[Miter](http://warframe.wikia.com/wiki/Miter) + [Hikou](http://warframe.wikia.com/wiki/Hikou) are crafting components for the [Panthera](http://warframe.wikia.com/wiki/Panthera)' ;
	       		break;
	       	case 'lato':
	       		return '[Lato](http://warframe.wikia.com/wiki/Lato) is crafting component for the [Bolto](http://warframe.wikia.com/wiki/Bolto)' ;
	       		break;
			case 'bolto':
				return '2x [Bolto](http://warframe.wikia.com/wiki/Bolto) are crafting components for the [Akbolto](http://warframe.wikia.com/wiki/Akbolto)\nAnd 1x [Bolto](http://warframe.wikia.com/wiki/Bolto) + [Viper](http://warframe.wikia.com/wiki/Viper) are crafting components for the [Hystrix](http://warframe.wikia.com/wiki/Hystrix)' ;
				break;
	       	case 'akbolto':
	       		return '[Akbolto](http://warframe.wikia.com/wiki/Akbolto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) are crafting components for the [Akjagara](http://warframe.wikia.com/wiki/Akjagara)' ;
	       		break;
	       	case 'dual skana':
	       		return '[Akbolto](http://warframe.wikia.com/wiki/Akbolto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) are crafting components for the [Akjagara](http://warframe.wikia.com/wiki/Akjagara)\nAnd [Vasto](http://warframe.wikia.com/wiki/Vasto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) for crafting the [Redeemer](http://warframe.wikia.com/wiki/Redeemer)\nAnd [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) is crafting component for the [Dark Split Sword](http://warframe.wikia.com/wiki/Dark_Split-Sword)' ;
	       		break;
	       	case 'akstiletto':
	       		return '[Akstiletto](http://warframe.wikia.com/wiki/Akstiletto) is crafting component for the [Aksomati](http://warframe.wikia.com/wiki/Aksomati) and the [Sarpa](http://warframe.wikia.com/wiki/Sarpa)' ;
	       		break;
	       	case 'gammacor':
	       		return '[Gammacor](http://warframe.wikia.com/wiki/Gammacor) is crafting component for the [Heliocor](http://warframe.wikia.com/wiki/Heliocor)' ;
	       		break;
	       	case 'kraken':
	       		return '[Kraken](http://warframe.wikia.com/wiki/Kraken) is crafting component for the [Kulstar](http://warframe.wikia.com/wiki/Kulstar)' ;
	       		break;
	       	case 'bronco':
	       		return '2x [Bronco](http://warframe.wikia.com/wiki/Bronco) are crafting components for the [Akbronco](http://warframe.wikia.com/wiki/Akbronco)';
	       		break;
	       	case 'bronco prime':
	       		return '2x [Bronco Prime](http://warframe.wikia.com/wiki/Bronco_Prime) are crafting components for the [Akbronco Prime](http://warframe.wikia.com/wiki/Akbronco_Prime)';
	       		break;
	       	case 'cestra':
	       		return '2x [Cestra](http://warframe.wikia.com/wiki/Cestra) are crafting components for the [Dual Cestra](http://warframe.wikia.com/wiki/Dual_Cestra)';
	       		break;
	       	case 'furis':
	       		return '2x [Furis](http://warframe.wikia.com/wiki/Furis) are crafting components for the [Afuris](http://warframe.wikia.com/wiki/Afuris)';
	       		break;
	       	case 'kohmak':
	       		return '2x [Kohmak](http://warframe.wikia.com/wiki/Kohmak) are crafting components for the [Twin Kohmak](http://warframe.wikia.com/wiki/Twin_Kohmak)';
	       		break;
	       	case 'lex':
	       		return '2x [Lex](http://warframe.wikia.com/wiki/Lex) are crafting components for the [Aklex](http://warframe.wikia.com/wiki/Aklex)';
	       		break;
	       	case 'lex prime':
	       		return '2x [Lex Prime](http://warframe.wikia.com/wiki/Lex_Prime) are crafting components for the [Aklex Prime](http://warframe.wikia.com/wiki/Aklex_Prime)';
	       		break;
	       	case 'magnus':
	       		return '2x [Magnus](http://warframe.wikia.com/wiki/Magnus) are crafting components for the [Akmagnus](http://warframe.wikia.com/wiki/Akmagnus)';
	       		break;
	       	case 'vasto':
	       		return '2x [Vasto](http://warframe.wikia.com/wiki/Vasto) are crafting components for the [Akvasto](http://warframe.wikia.com/wiki/Akvasto)\nAnd 1x [Vasto](http://warframe.wikia.com/wiki/Vasto) + [Dual Skana](http://warframe.wikia.com/wiki/Dual_Skana) for crafting the [Redeemer](http://warframe.wikia.com/wiki/Redeemer)';
	       		break;
			case 'viper':
	       		return '2x [Viper](http://warframe.wikia.com/wiki/Viper) are crafting components for the [Twin Vipers](http://warframe.wikia.com/wiki/Twin_Vipers)\nAnd 1x [Viper](http://warframe.wikia.com/wiki/Viper) + [Bolto](http://warframe.wikia.com/wiki/Bolto) are crafting components for the [Hystrix](http://warframe.wikia.com/wiki/Hystrix)';
				break;
	       	case 'atomos':
	       		return '[Atomos](http://warframe.wikia.com/wiki/Atomos) + [Dual Zoren](http://warframe.wikia.com/wiki/Dual_Zoren) are crafting components for the [Twin Bazok](http://warframe.wikia.com/wiki/Twin_Basolk)';
	       		break;
	       	case 'dual zoren':
	       		return '[Atomos](http://warframe.wikia.com/wiki/Atomos) + [Dual Zoren](http://warframe.wikia.com/wiki/Dual_Zoren) are crafting components for the [Twin Bazok](http://warframe.wikia.com/wiki/Twin_Basolk)';
	       		break;
	       	case 'kunai':
	       		return '[Kunai](http://warframe.wikia.com/wiki/Kunai) + [Bo](http://warframe.wikia.com/wiki/Bo) are crafting component for the [Tipedo](http://warframe.wikia.com/wiki/Tipedo)';
	       		break;
	       	case 'bo':
	       		return '[Kunai](http://warframe.wikia.com/wiki/Kunai) + [Bo](http://warframe.wikia.com/wiki/Bo) are crafting component for the [Tipedo](http://warframe.wikia.com/wiki/Tipedo)';
	       		break;
	    	case 'kama':
	       		return '2x [Kama](http://warframe.wikia.com/wiki/Kama) are crafting components for the [Dual Kamas](http://warframe.wikia.com/wiki/Dual_Kamas)';
	       		break;
	       	case 'dual kamas':
	       		return '[Dual Kamas](http://warframe.wikia.com/wiki/Dual_Kamas) is crafting component for the [Dual Raza](http://warframe.wikia.com/wiki/Dual_Raza)';
	       		break;
	       	case 'krohkur':
	       		return '2x [Krohkur](http://warframe.wikia.com/wiki/Krohkur) are crafting components for the [Twin Krohkur](http://warframe.wikia.com/wiki/Twin_Krohkur)';
	       		break;
	       	case 'tipedo':
	       		return '[Tipedo](http://warframe.wikia.com/wiki/Tipedo) is crafting component for the [Lesion](http://warframe.wikia.com/wiki/Lesion)';
	       		break;
	    	case 'amphis':
	       		return '[Amphis](http://warframe.wikia.com/wiki/Amphis) is crafting component for the [Sydon](http://warframe.wikia.com/wiki/Sydon)';
	       		break;
	    	case 'ankyros':
	       		return '[Ankyros](http://warframe.wikia.com/wiki/Ankyros) is crafting component for the [Tekko]http://warframe.wikia.com/wiki/Tekko\nAnd [Ankyros](http://warframe.wikia.com/wiki/Ankyros) + [Dual_Cleavers](http://warframe.wikia.com/wiki/Dual_Cleavers) are crafting components for the [Ripkas](http://warframe.wikia.com/wiki/Ripkas)' ;
	       		break;
	    	case 'dual cleavers':
	       		return '[Ankyros](http://warframe.wikia.com/wiki/Ankyros) + [Dual_Cleavers](http://warframe.wikia.com/wiki/Dual_Cleavers) are crafting components for the [Ripkas](http://warframe.wikia.com/wiki/Ripkas)';
	       		break;
	    	case 'broken war':
	       		return '[Broken War](http://warframe.wikia.com/wiki/Broken_War) is crafting component for the [War](http://warframe.wikia.com/wiki/War)';
	       		break;
	    	case 'furax':
	       		return '[Furax](http://warframe.wikia.com/wiki/Furax) is crafting component for the [Knux](http://warframe.wikia.com/wiki/Knux)';
	       		break;
	    	case 'kogake':
	       		return '[Kogake](http://warframe.wikia.com/wiki/Kogake) is crafting component for the [Hirudo](http://warframe.wikia.com/wiki/Hirudo)';
	       		break;
	    	case 'magistar':
	       		return '[Magistar](http://warframe.wikia.com/wiki/Magistar) is crafting component for the [Sibear](http://warframe.wikia.com/wiki/Sibear)';
	       		break;
	    	case 'nikana':
	       		return '[Nikana](http://warframe.wikia.com/wiki/Nikana) is crafting component for the [Dragon Nikana](http://warframe.wikia.com/wiki/Dragon_Nikana)';
	       		break;
	    	case 'ninkondi':
	       		return '[Ninkondi](http://warframe.wikia.com/wiki/Ninkondi) is crafting component for the [Shaku](http://warframe.wikia.com/wiki/Shaku)';
	       		break;
	    	default:
	       		return 'Ordis didn\'t find anything, operator, probably your weapon is not used for any crafting, this list was updated in April 20th, 2018.';	
		} 

	} 

}