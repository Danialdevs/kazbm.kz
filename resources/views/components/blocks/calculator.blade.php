<div class="block3">
    <div class="titles">{{ __("Рассчитайте необходимое количество кирпича") }}</div>
    <div class="box">
        <div class="box_left">
            <div class="box_title">1. {{ __("Выберите тип проекта") }}</div>
            <div class="box_row">
                @php $calculatorSettings = app(\App\Filament\Settings\CalculatorSettings::class) @endphp
                <div class="type radio">
                    <input type="radio" name="type" value="1" checked>
                    <label>{{ $calculatorSettings->getType(0) }}</label>
                </div>
                <div class="type radio disabled" title="{{ __("Расчет рядового кирпича доступен только в расширенной версии калькулятора") }}">
                    <input type="radio" name="type" value="2">
                    <label title='{{ __("Расчет рядового кирпича доступен только в расширенной версии калькулятора") }}'>{{ $calculatorSettings->getType(1) }}</label>
                </div>
            </div>
            <div class="box_title">2.{{ __("Выберите размер кирпича") }}</div>
            <div class="box_row size_box">
                @if($sizes->isNotEmpty())
                    @foreach($sizes as $key => $size)
                        @php($counter = $key + 1)
                        <div class="size radio {{ $counter == 1 ? 'active' : '' }}">
                            <input type="radio" name="size" value="{{$counter}}00"
                                   data-value="{{ $size->value }}"
                                   data-kg="{{ $size->weight }}"
                                   @if($counter == 1) checked @endif>
                            <img src="{{ $size->getRealFormat('image') }}" alt="{{ $size->name }}" loading="lazy">
                            <div class="text">{{ $size->name }}</div>
                        </div>
                    @endforeach
                @endif
            </div>
            <div class="box_title">3. {{ __("Введите размеры строения") }}</div>
            <div class="box_row IWR">
                <div class="inputsWithRadio">
                    <img class="icon" src="{{ asset('images/icons/'.$icon_name.'_1'.'.svg') }}" alt="" loading="lazy">
                    <label>{{ __("Длина всех стен, мм") }} <img class="q" src="{{ asset('images/icons/question.svg') }}" title="{{ __("Измерьте длину всех внешних стен.") }}"></label>
                    <input class="fi" type="number" value="0" min="0">
                </div>
                <div class="inputsWithRadio">
                    <img class="icon" src="{{ asset('images/icons/'.$icon_name.'_2'.'.svg') }}" alt="" loading="lazy">
                    <label>{{ __("Высота стен по углам, мм") }} <img class="q" src="{{ asset('images/icons/question.svg') }}" title="{{ __("Измерьте высоту стен в углах здания.") }}"></label>
                    <input class="se" type="number" value="0" min="0">
                </div>
                <div class="inputsWithRadio">
                    <img class="icon" src="{{ asset('images/icons/'.$icon_name.'_3'.'.svg') }}" alt="" loading="lazy">
                    <label>{{ __("Длина дверей и окон, мм") }} <img class="q" src="{{ asset('images/icons/question.svg') }}" title="{{ __("Введите суммарную длину всех дверей и окон.") }}"></label>
                    <input class="th" type="number" value="0" min="0">
                </div>
                <div class="inputsWithRadio">
                    <img class="icon" src="{{ asset('images/icons/'.$icon_name.'_4'.'.svg') }}" alt="" loading="lazy">
                    <label>{{ __("Высота дверей и окон, мм") }} <img class="q" src="{{ asset('images/icons/question.svg') }}" title="{{ __("Введите суммарную высоту всех дверей и окон.") }}"></label>
                    <input class="fo" type="number" value="0" min="0">
                </div>
            </div>
        </div>
        <div class="box_right">
            <div class="head">
                @for($i = 1; $i <= 4; $i++)
                    <div class="head_item {{ $i == 1 ? 'active' : '' }}">
                        <img src="{{ asset('images/icons/'.$icon_name.'_'.$i.'.svg') }}" alt="{{$icon_name}}_{{$i}} icon" loading="lazy">
                    </div>
                @endfor
                <div class="desc">{{ __("Идеальный выбор для строительства надежных и долговечных стен, фасадов и внутренних перегородок благодаря своей прочности, удобству монтажа и эстетической привлекательности.") }}</div>
            </div>
            <div class="body">
                <div class="body_column">
                    <div class="title">{{ __("Количество кирпича, шт:") }}</div>
                    <div class="num count kirpichShtuk">34 567</div>
                </div>
                <div class="body_column">
                    <div class="title">{{ __("Итоговая стоимость, тенге:") }}</div>
                    <div class="num cost kirpichAllCost">123 456 12</div>
                </div>
                <a class="btn" href="{{ route('pages.get', 'calculator') }}">{{ __("Перейти в расширенную версию") }}</a>
            </div>
        </div>
    </div>
</div>
