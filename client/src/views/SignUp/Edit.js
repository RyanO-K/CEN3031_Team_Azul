function Edit(){






    <div className="Signin-card">
    <p></p>
    <input type="text" placeholder="name" value={UserState.getLocalStorageName()} name="name" ref={register} onChange={(e)=>func5(e.target.value)}/>
    <div>
        <input type="email" placeholder="Email Address"value={UserState.getLocalStorageEmail()} name="email" ref={register}/>
    </div>
    <div>
        <input type="text" placeholder="Place of Birth"value={UserState.getLocalStorageBDay()} name="pob" ref={register} onChange={(e)=>func2(e.target.value)}/>
    </div>
    <div>
        <input type="text" placeholder="Time of Birth" value={UserState.getLocalStorageBTime()} name="tob" ref={register} onChange={(e)=>func6(e.target.value)}/>
    </div>
    <div>
    <input type="date" placeholder="Date of Birth" value={UserState.getLocalStorageBPlace()} name="dob" ref={register} onChange={(e)=>func(e.target.value)} />
    </div>
    <div>
    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:{user:newUser, g:false}}}> Submit</ColorButton>
        </div>
    </div>
}